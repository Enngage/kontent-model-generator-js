
/** 
* This file has been auto-generated by '@kontent-ai/model-generator@7.4.0'.
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

import type { IContentItem, Elements } from '@kontent-ai/delivery-sdk';
import type { Actor } from '../content-types/actor.js';
import type { Releasecategory } from '../taxonomies/releasecategory.js';

/**
 * Movie
 *
 * Id: b0c0f9c2-ffb6-4e62-bac9-34e14172dd8c
 * Codename: movie
 */
export type Movie = IContentItem<{
    /**
     * Category (multiple_choice)
     *
     * Required: false
     * Codename: category
     * Id: 9821c252-6414-f549-c17f-cc171dd87713
     */
    category: Elements.MultipleChoiceElement;
    /**
     * Length (number)
     *
     * Required: false
     * Codename: length
     * Id: 7e8ecfab-a419-27ee-d8ec-8adb76fd007c
     */
    length: Elements.NumberElement;
    /**
     * Plot (rich_text)
     *
     * Required: false
     * Codename: plot
     * Id: f7ee4f27-27fd-a19b-3c5c-102aae1c50ce
     */
    plot: Elements.RichTextElement;
    /**
     * Poster (asset)
     *
     * Required: false
     * Codename: poster
     * Id: a39a7237-9503-a1ae-8431-5b6cdb85ae9d
     */
    poster: Elements.AssetsElement;
    /**
     * ReleaseCategory (taxonomy)
     *
     * Required: false
     * Codename: releasecategory
     * Id: 65f2fd44-1856-bc2b-17c2-decb0635e3d2
     */
    releasecategory: Elements.TaxonomyElement<Releasecategory>;
    /**
     * Released (date_time)
     *
     * Required: false
     * Codename: released
     * Id: 5ccf4644-0d65-5d96-9a32-f4ea21974d51
     */
    released: Elements.DateTimeElement;
    /**
     * SeoName (url_slug)
     *
     * Required: false
     * Codename: seoname
     * Id: 756cc91a-a090-60f9-a7f0-f505bfbe046c
     */
    seoname: Elements.UrlSlugElement;
    /**
     * Stars (modular_content)
     *
     * Required: false
     * Codename: stars
     * Id: aa26a55d-19f8-7501-fea3-b0d9b1eeac71
     */
    stars: Elements.LinkedItemsElement<Actor | Movie>;
    /**
     * Title (text)
     *
     * Required: true
     * Codename: title
     * Id: 3473187e-dc78-eff2-7099-f690f7042d4a
     */
    title: Elements.TextElement;
}>;
