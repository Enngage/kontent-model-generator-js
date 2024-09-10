import { ContentTypeModels, ContentTypeSnippetModels, EnvironmentModels, TaxonomyModels } from '@kontent-ai/management-sdk';
import { isNotUndefined } from '@kontent-ai/migration-toolkit';
import { match, P } from 'ts-pattern';
import { deliveryConfig } from '../../config.js';
import {
    importer as _importer,
    ContentTypeFileNameResolver,
    ContentTypeNameResolver,
    ContentTypeSnippetFileNameResolver,
    ContentTypeSnippetNameResolver,
    FlattenedElement,
    GeneratedFile,
    getFlattenedElements,
    mapFilename,
    mapName,
    ModuleResolution,
    sortAlphabetically,
    TaxonomyNameResolver,
    TaxonomyTypeFileNameResolver,
    toGuidelinesComment,
    uniqueFilter,
    wrapComment
} from '../../core/index.js';

interface ExtractImportsResult {
    readonly typeName: string;
    readonly imports: readonly string[];
    readonly contentTypeExtends: string | undefined;
}

export interface DeliveryContentTypeGeneratorConfig {
    readonly moduleResolution: ModuleResolution;

    readonly environmentData: {
        readonly environment: Readonly<EnvironmentModels.EnvironmentInformationModel>;
        readonly types: readonly Readonly<ContentTypeModels.ContentType>[];
        readonly taxonomies: readonly Readonly<TaxonomyModels.Taxonomy>[];
        readonly snippets: readonly Readonly<ContentTypeSnippetModels.ContentTypeSnippet>[];
    };

    readonly fileResolvers?: {
        readonly contentType?: ContentTypeFileNameResolver;
        readonly snippet?: ContentTypeSnippetFileNameResolver;
        readonly taxonomy?: TaxonomyTypeFileNameResolver;
    };

    readonly nameResolvers?: {
        readonly contentType?: ContentTypeNameResolver;
        readonly snippet?: ContentTypeSnippetNameResolver;
        readonly taxonomy?: TaxonomyNameResolver;
    };
}

export function deliveryContentTypeGenerator(config: DeliveryContentTypeGeneratorConfig) {
    const fileResolvers = {
        snippet: mapFilename(config.fileResolvers?.snippet),
        contentType: mapFilename(config.fileResolvers?.contentType),
        taxonomy: mapFilename(config.fileResolvers?.taxonomy)
    };

    const importer = _importer(config.moduleResolution);

    const nameResolvers = {
        snippet: mapName(config.nameResolvers?.snippet, 'pascalCase'),
        contentType: mapName(config.nameResolvers?.contentType, 'pascalCase'),
        taxonomy: mapName(config.nameResolvers?.taxonomy, 'pascalCase')
    };

    const generateModels = (): {
        contentTypeFiles: readonly GeneratedFile[];
        snippetFiles: readonly GeneratedFile[];
    } => {
        return {
            contentTypeFiles: config.environmentData.types.map((type) => createTypeModel(type)),
            snippetFiles: config.environmentData.snippets.map((contentTypeSnippet) => createTypeModel(contentTypeSnippet))
        };
    };

    const getSnippetImports = (snippets: readonly Readonly<ContentTypeSnippetModels.ContentTypeSnippet>[]): readonly string[] => {
        return snippets.map((snippet) => {
            return importer.importType({
                filePathOrPackage: `../${deliveryConfig.contentTypeSnippetsFolderName}/${fileResolvers.snippet(snippet, false)}.ts`,
                importValue: nameResolvers.snippet(snippet)
            });
        });
    };

    const getElementImports = (
        typeOrSnippet: Readonly<ContentTypeModels.ContentType> | Readonly<ContentTypeSnippetModels.ContentTypeSnippet>,
        elements: readonly FlattenedElement[]
    ): readonly string[] => {
        return (
            elements
                // only take elements that are not from snippets
                .filter((m) => !m.fromSnippet)
                .map((flattenedElement) => {
                    return match(flattenedElement)
                        .returnType<string | string[]>()
                        .with({ type: 'taxonomy' }, (taxonomyElement) => {
                            if (!taxonomyElement.assignedTaxonomy) {
                                throw Error(`Invalid taxonomy for element '${taxonomyElement.codename}'`);
                            }
                            return importer.importType({
                                filePathOrPackage: `../${deliveryConfig.taxonomiesFolderName}/${fileResolvers.taxonomy(taxonomyElement.assignedTaxonomy, false)}.ts`,
                                importValue: nameResolvers.taxonomy(taxonomyElement.assignedTaxonomy)
                            });
                        })
                        .with(P.union({ type: 'modular_content' }, { type: 'subpages' }), (linkedItemsOrSubpagesElement) => {
                            return (linkedItemsOrSubpagesElement.allowedContentTypes ?? [])
                                .filter((allowedContentType) => {
                                    // filter self-referencing types as they do not need to be importer
                                    if (allowedContentType.codename === typeOrSnippet.codename) {
                                        return false;
                                    }
                                    return true;
                                })
                                .map((allowedContentType) => {
                                    const referencedTypeFilename: string = `${fileResolvers.contentType(allowedContentType, false)}`;

                                    return importer.importType({
                                        filePathOrPackage:
                                            typeOrSnippet instanceof ContentTypeModels.ContentType
                                                ? `../${deliveryConfig.contentTypesFolderName}/${referencedTypeFilename}.ts`
                                                : `./${referencedTypeFilename}.ts`,
                                        importValue: `${nameResolvers.contentType(allowedContentType)}`
                                    });
                                });
                        })
                        .otherwise(() => []);
                })
                .flatMap((m) => m)
                .filter(isNotUndefined)
                .filter(uniqueFilter)
        );
    };

    const getContentTypeImports = (data: {
        readonly typeOrSnippet: Readonly<ContentTypeModels.ContentType> | Readonly<ContentTypeSnippetModels.ContentTypeSnippet>;
        readonly flattenedElements: readonly FlattenedElement[];
    }): ExtractImportsResult => {
        const snippets = data.flattenedElements.map((m) => m.fromSnippet).filter(isNotUndefined);

        return {
            imports: sortAlphabetically(
                [...getElementImports(data.typeOrSnippet, data.flattenedElements), ...getSnippetImports(snippets)]
                    .filter(isNotUndefined)
                    .filter(uniqueFilter),
                (importValue) => importValue
            ),
            contentTypeExtends:
                data.typeOrSnippet instanceof ContentTypeModels.ContentType && snippets.length
                    ? `& ${sortAlphabetically(
                          snippets.map((snippet) => nameResolvers.snippet(snippet)).filter(uniqueFilter),
                          (snippetName) => snippetName
                      ).join(' & ')}`
                    : undefined,
            typeName:
                data.typeOrSnippet instanceof ContentTypeModels.ContentType
                    ? nameResolvers.contentType(data.typeOrSnippet)
                    : nameResolvers.snippet(data.typeOrSnippet)
        };
    };

    const getDeliverySdkContentTypeImports = (flattenedElements: readonly FlattenedElement[]): readonly string[] => {
        return sortAlphabetically(
            [deliveryConfig.sdkTypes.contentItem, ...(flattenedElements.length ? [deliveryConfig.sdkTypes.elements] : [])],
            (m) => m
        );
    };

    const getModelCode = (
        typeOrSnippet: Readonly<ContentTypeModels.ContentType> | Readonly<ContentTypeSnippetModels.ContentTypeSnippet>
    ): string => {
        const flattenedElements = getFlattenedElements(
            typeOrSnippet.elements,
            config.environmentData.snippets,
            config.environmentData.taxonomies,
            config.environmentData.types
        );

        const contentTypeImports = getContentTypeImports({
            typeOrSnippet,
            flattenedElements: flattenedElements
        });

        return `
${importer.importType({
    filePathOrPackage: deliveryConfig.npmPackageName,
    importValue: `${getDeliverySdkContentTypeImports(flattenedElements).join(', ')}`
})}
${contentTypeImports.imports.join('\n')}

${wrapComment(`
* ${typeOrSnippet.name}
* 
* Id: ${typeOrSnippet.id}
* Codename: ${typeOrSnippet.codename}    
`)}
export type ${contentTypeImports.typeName} = ${deliveryConfig.sdkTypes.contentItem}<{
    ${getElementsCode(flattenedElements)}
}>${contentTypeImports.contentTypeExtends ? ` ${contentTypeImports.contentTypeExtends}` : ''};
`;
    };

    const createTypeModel = (
        type: Readonly<ContentTypeModels.ContentType | ContentTypeSnippetModels.ContentTypeSnippet>
    ): GeneratedFile => {
        return {
            filename: `${deliveryConfig.contentTypesFolderName}/${fileResolvers.contentType(type, true)}`,
            text: getModelCode(type)
        };
    };

    const getElementsCode = (flattenedElements: readonly FlattenedElement[]): string => {
        return (
            flattenedElements
                // filter out elements that are from snippets
                .filter((m) => !m.fromSnippet)
                .reduce<string>((code, element) => {
                    const mappedType = mapElementType(element);

                    if (!mappedType) {
                        return code;
                    }

                    return (code += `
                ${wrapComment(`
                * ${element.title} (${element.type})
                * 
                * Required: ${element.isRequired ? 'true' : 'false'}
                * Codename: ${element.codename}
                * Id: ${element.id}${element.guidelines ? `\n* Guidelines: ${toGuidelinesComment(element.guidelines)}` : ''}
                `)} 
                ${element.codename}: ${deliveryConfig.sdkTypes.elements}.${mappedType};`);
                }, '')
        );
    };

    const mapElementType = (element: FlattenedElement): string | undefined => {
        return match(element)
            .returnType<string | undefined>()
            .with({ type: 'text' }, () => 'TextElement')
            .with({ type: 'number' }, () => 'NumberElement')
            .with({ type: 'modular_content' }, (linkedItemsElement) => {
                return `LinkedItemsElement<${getLinkedItemsAllowedTypes(linkedItemsElement.allowedContentTypes ?? []).join(' | ')}>`;
            })
            .with({ type: 'asset' }, () => 'AssetsElement')
            .with({ type: 'date_time' }, () => 'DateTimeElement')
            .with({ type: 'rich_text' }, () => 'RichTextElement')
            .with({ type: 'multiple_choice' }, () => 'MultipleChoiceElement')
            .with({ type: 'url_slug' }, () => 'UrlSlugElement')
            .with({ type: 'taxonomy' }, (taxonomyElement) => {
                const taxonomyName = getTaxonomyTypeName(taxonomyElement);
                return taxonomyName ? `TaxonomyElement<${taxonomyName}>` : `TaxonomyElement`;
            })
            .with({ type: 'custom' }, () => 'CustomElement')
            .otherwise(() => undefined);
    };

    const getTaxonomyTypeName = (element: FlattenedElement): string | undefined => {
        return element.assignedTaxonomy ? nameResolvers.taxonomy(element.assignedTaxonomy) : undefined;
    };

    const getLinkedItemsAllowedTypes = (types: readonly Readonly<ContentTypeModels.ContentType>[]): readonly string[] => {
        if (!types.length) {
            return [deliveryConfig.sdkTypes.contentItem];
        }

        return types.map((type) => nameResolvers.contentType(type));
    };

    return {
        generateModels
    };
}
