
/** 
* This file has been auto-generated by '@kontent-ai/model-generator@7.4.0'.
* 
* (c) Kontent.ai
*  
* -------------------------------------------------------------------------------
* 
* Project: Migration Toolkit - tests
* Environment: Production
* Id: 5ddb8f47-a51f-0124-35b1-f6634fa91ae2
* 
* -------------------------------------------------------------------------------
**/

import type { MigrationElementModels } from '@kontent-ai/migration-toolkit';
import type { Item } from '../migration.js';

/**
 * 😺 My Special type[hello]++🥸'`
 *
 * Codename: special_type
 * Id: 410fb007-42e3-442d-8cdf-fba4cf50f850
 */
export type MySpecialTypehelloItem = Item<
    'special_type',
    {
        /**
         * Hello (text)
         *
         * Required: false
         * Codename: hello
         * Id: 41d50fe3-0858-494c-9f33-85960821b5d6
         */
        hello: MigrationElementModels.TextElement;
    }
>;
