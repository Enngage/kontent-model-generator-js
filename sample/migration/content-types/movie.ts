
/** 
* This file has been auto-generated by '@kontent-ai/model-generator@8.0.0-5'.
* 
* (c) Kontent.ai
*  
* -------------------------------------------------------------------------------
* 
* Project: Movie Database
* Environment: Production
* Id: da5abe9f-fdad-4168-97cd-b3464be2ccb9
* 
* -------------------------------------------------------------------------------
**/

import type { MigrationElementModels } from '@kontent-ai/migration-toolkit';
import type { Item } from '../migration.js';

/**
 * Movie
 *
 * Codename: movie
 * Id: b0c0f9c2-ffb6-4e62-bac9-34e14172dd8c
 */
export type MovieItem = Item<
    'movie',
    {
        /**
         * Title
         *
         * Type: text
         * Required: true
         * Codename: title
         * Id: 3473187e-dc78-eff2-7099-f690f7042d4a
         */
        readonly title: MigrationElementModels.TextElement;

        /**
         * Plot
         *
         * Type: rich_text
         * Required: false
         * Codename: plot
         * Id: f7ee4f27-27fd-a19b-3c5c-102aae1c50ce
         */
        readonly plot: MigrationElementModels.RichTextElement;

        /**
         * Released
         *
         * Type: date_time
         * Required: false
         * Codename: released
         * Id: 5ccf4644-0d65-5d96-9a32-f4ea21974d51
         */
        readonly released: MigrationElementModels.DateTimeElement;

        /**
         * Length
         *
         * Type: number
         * Required: false
         * Codename: length
         * Id: 7e8ecfab-a419-27ee-d8ec-8adb76fd007c
         */
        readonly length: MigrationElementModels.NumberElement;

        /**
         * Poster
         *
         * Type: asset
         * Required: false
         * Codename: poster
         * Id: a39a7237-9503-a1ae-8431-5b6cdb85ae9d
         */
        readonly poster: MigrationElementModels.AssetElement;

        /**
         * Category
         *
         * Type: multiple_choice
         * Required: false
         * Codename: category
         * Id: 9821c252-6414-f549-c17f-cc171dd87713
         */
        readonly category: MigrationElementModels.MultipleChoiceElement;

        /**
         * Stars
         *
         * Type: modular_content
         * Required: false
         * Codename: stars
         * Id: aa26a55d-19f8-7501-fea3-b0d9b1eeac71
         */
        readonly stars: MigrationElementModels.LinkedItemsElement;

        /**
         * SeoName
         *
         * Type: url_slug
         * Required: false
         * Codename: seoname
         * Id: 756cc91a-a090-60f9-a7f0-f505bfbe046c
         */
        readonly seoname: MigrationElementModels.UrlSlugElement;

        /**
         * ReleaseCategory
         *
         * Type: taxonomy
         * Required: false
         * Codename: releasecategory
         * Id: 65f2fd44-1856-bc2b-17c2-decb0635e3d2
         */
        readonly releasecategory: MigrationElementModels.TaxonomyElement;
    }
>;
