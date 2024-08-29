/**
 * This file has been auto-generated by '@kontent-ai/model-generator@7.4.0'.
 *
 * (c) Kontent.ai
 *
 * -------------------------------------------------------------------------------
 *
 * Environment: Production
 * Id: 5ddb8f47-a51f-0124-35b1-f6634fa91ae2
 *
 * -------------------------------------------------------------------------------
 **/
export const contentTypes = {
    /**
     * Actor
     */
    actor: {
        codename: 'actor',
        id: 'd8900ee2-82f4-4189-a994-4e121582aadf',
        externalId: undefined,
        name: 'Actor',
        elements: {
            /**
             * photo (asset)
             */
            photo: {
                codename: 'photo',
                id: '069b38ee-385c-410f-b7fe-53ec59a5f139',
                externalId: undefined,
                name: 'photo',
                required: false,
                type: 'asset'
            },

            /**
             * url (url_slug)
             */
            url: {
                codename: 'url',
                id: 'c4b2d64f-af45-45a4-92d8-4829833563ff',
                externalId: undefined,
                name: 'url',
                required: false,
                type: 'url_slug'
            },

            /**
             * last_name (text)
             */
            lastName: {
                codename: 'last_name',
                id: '0f00b26e-60f3-462d-8110-18180137c3a0',
                externalId: undefined,
                name: 'last_name',
                required: false,
                type: 'text'
            },

            /**
             * first_name (text)
             */
            firstName: {
                codename: 'first_name',
                id: '4af5e7ce-88ef-4159-96ae-96a552992f91',
                externalId: undefined,
                name: 'first_name',
                required: false,
                type: 'text'
            }
        }
    },

    /**
     * Movie
     */
    movie: {
        codename: 'movie',
        id: 'db7356f6-1d82-42a0-9ebb-07865cffa995',
        externalId: undefined,
        name: 'Movie',
        elements: {
            /**
             * Category (taxonomy)
             */
            taxonomySnippetTestTestTaxonomy: {
                codename: 'taxonomy_snippet_test__test_taxonomy',
                id: 'c030e3ec-5031-4d7f-af88-5032365733c7',
                externalId: undefined,
                name: 'Category',
                required: false,
                type: 'taxonomy'
            },

            /**
             * Release category (taxonomy)
             */
            releasecategory: {
                codename: 'releasecategory',
                id: '5faa827f-f262-43c3-8f58-0f354b8d393f',
                externalId: undefined,
                name: 'Release category',
                required: false,
                type: 'taxonomy'
            },

            /**
             * Category (taxonomy)
             */
            category: {
                codename: 'category',
                id: '8c12be35-e3e7-447c-a185-7b5e101ebf12',
                externalId: undefined,
                name: 'Category',
                required: false,
                type: 'taxonomy'
            },

            /**
             * length (number)
             */
            length: {
                codename: 'length',
                id: 'e3d07f3a-60c2-4072-846d-c23e51ec833e',
                externalId: undefined,
                name: 'length',
                required: false,
                type: 'number'
            },

            /**
             * stars (modular_content)
             */
            stars: {
                codename: 'stars',
                id: '55596dd1-e808-415d-95aa-e2be34238d11',
                externalId: undefined,
                name: 'stars',
                required: false,
                type: 'modular_content'
            },

            /**
             * seoname (url_slug)
             */
            seoname: {
                codename: 'seoname',
                id: '734f94be-5930-4bdf-b05b-f59f5a291675',
                externalId: undefined,
                name: 'seoname',
                required: false,
                type: 'url_slug'
            },

            /**
             * poster (asset)
             */
            poster: {
                codename: 'poster',
                id: '9b197f1e-0728-4d14-9814-97f7b8ef01fc',
                externalId: undefined,
                name: 'poster',
                required: false,
                type: 'asset'
            },

            /**
             * released (date_time)
             */
            released: {
                codename: 'released',
                id: '656b9dc9-7bba-4f1f-a2b8-52f7f730a66f',
                externalId: undefined,
                name: 'released',
                required: false,
                type: 'date_time'
            },

            /**
             * plot (rich_text)
             */
            plot: {
                codename: 'plot',
                id: 'ad2e5dc7-8d08-4f74-afeb-25b475f1e6fc',
                externalId: undefined,
                name: 'plot',
                required: false,
                type: 'rich_text'
            },

            /**
             * title (text)
             */
            title: {
                codename: 'title',
                id: '660c851a-a9a1-4378-97a3-1348bc2a4d76',
                externalId: undefined,
                name: 'title',
                required: false,
                type: 'text'
            }
        }
    },

    /**
     * Test
     */
    test: {
        codename: 'test',
        id: '81ab0b2c-dd14-41e7-a1ed-868b249ad8bc',
        externalId: undefined,
        name: 'Test',
        elements: {
            /**
             * Text (text)
             */
            text: {
                codename: 'text',
                id: '65f61f6a-b69c-47dc-bc38-19855507bf14',
                externalId: undefined,
                name: 'Text',
                required: false,
                type: 'text'
            },

            /**
             * Snippet elem1 (text)
             */
            mySnippetSnippetElem1: {
                codename: 'my_snippet__snippet_elem1',
                id: '3b89ad47-4a72-4b4e-84b0-e8e8a7a3814d',
                externalId: undefined,
                name: 'Snippet elem1',
                required: false,
                type: 'text'
            },

            /**
             * Snippet elem 2 (number)
             */
            mySnippetSnippetElem2: {
                codename: 'my_snippet__snippet_elem_2',
                id: 'b2f65646-3310-4a64-af2a-0d9d025a91d0',
                externalId: undefined,
                name: 'Snippet elem 2',
                required: false,
                type: 'number'
            }
        }
    }
} as const;
