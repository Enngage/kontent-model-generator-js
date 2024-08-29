import type { MigrationElementModels } from '@kontent-ai/migration-toolkit';
import type { Item } from '../core.models.js';

/**
 * Test
 *
 * Codename: test
 * Id: 81ab0b2c-dd14-41e7-a1ed-868b249ad8bc
 */
export type TestItem = Item<
    'test',
    {
        /**
         * Text (text)
         *
         * Required: false
         * Codename: text
         * Id: 65f61f6a-b69c-47dc-bc38-19855507bf14
         */
        text: MigrationElementModels.TextElement;

        /**
         * Snippet elem1 (text)
         *
         * Required: false
         * Codename: my_snippet__snippet_elem1
         * Id: 3b89ad47-4a72-4b4e-84b0-e8e8a7a3814d
         */
        my_snippet__snippet_elem1: MigrationElementModels.TextElement;

        /**
         * Snippet elem 2 (number)
         *
         * Required: false
         * Codename: my_snippet__snippet_elem_2
         * Id: b2f65646-3310-4a64-af2a-0d9d025a91d0
         */
        my_snippet__snippet_elem_2: MigrationElementModels.NumberElement;
    }
>;
