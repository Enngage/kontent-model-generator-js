import { camelCasePropertyNameResolver, pascalCasePropertyNameResolver, snakeCasePropertyNameResolver } from '@kontent-ai/delivery-sdk';
import { parse } from 'path';
import { CliAction, LibraryType, ModuleResolution } from './core.models.js';

export function uniqueFilter(value: string, index: number, self: readonly string[]): boolean {
    return self.indexOf(value) === index;
}

export function getCliAction(cliAction: CliAction): CliAction {
    return cliAction;
}

export function getLibrary(library: LibraryType): LibraryType {
    return library;
}

export function getModuleResolution(module: ModuleResolution): ModuleResolution {
    return module;
}

export function getDefaultModuleResolution(moduleResolution: ModuleResolution | undefined): ModuleResolution {
    return moduleResolution ?? 'node';
}

export function getFileNameWithoutExtension(filePath: string): string {
    return filePath.substring(0, filePath.lastIndexOf('.'));
}

export function getFilenameFromPath(filePath: string): string {
    return parse(filePath).name;
}

export function sortAlphabetically<T>(arrayToSort: readonly T[], propertySelector: (item: T) => string): readonly T[] {
    return arrayToSort.toSorted((a, b) => propertySelector(a).toLowerCase().localeCompare(propertySelector(b).toLowerCase()));
}

export function toPascalCase(text: string): string {
    // use element resolver from SDK to keep it consistent
    return toSafeStringCode(pascalCasePropertyNameResolver('', text));
}

export function toCamelCase(text: string): string {
    // use element resolver from SDK to keep it consistent
    return toSafeStringCode(camelCasePropertyNameResolver('', text));
}

export function toSnakeCase(text: string): string {
    // use element resolver from SDK to keep it consistent
    return toSafeStringCode(snakeCasePropertyNameResolver('', text));
}

export function toGuidelinesComment(guidelines: string): string {
    return toSafeString(removeLineEndings(guidelines));
}

export function getStringOrUndefined(text?: string): string {
    return text ? `'${text}'` : 'undefined';
}

export function toSafeString(text: string): string {
    return text;
}

export function toOutputDirPath(outputDir?: string): string {
    return outputDir ? `${outputDir}/`.replaceAll('//', '/') : `./`;
}

function removeLineEndings(value: string): string {
    return value.replace(/(\r\n|\n|\r)/gm, '');
}

function toSafeStringCode(text: string): string {
    const replaceContent = '';
    return text.replace(/[\s-]/g, replaceContent).replace(/[^a-zA-Z0-9_]/g, replaceContent);
}
