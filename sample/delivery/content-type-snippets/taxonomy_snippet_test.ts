import type { IContentItem, Elements } from '@kontent-ai/delivery-sdk';
import type { Category } from '../taxonomies/category.js';

/**
 *
 * Migration Toolkit   tests
 *
 * Environment: Production
 * Id: 5ddb8f47-a51f-0124-35b1-f6634fa91ae2
 */

/**
 * Taxonomy snippet test
 *
 * Id: e8219115-e629-4552-b79b-d9f813272573
 * Codename: taxonomy_snippet_test
 */
export type TaxonomySnippetTest = IContentItem<{
    /**
     * Category (taxonomy)
     *
     * Required: false
     * Codename: taxonomy_snippet_test__test_taxonomy
     * Id: c030e3ec-5031-4d7f-af88-5032365733c7
     */
    taxonomy_snippet_test__test_taxonomy: Elements.TaxonomyElement<Category>;
}>;