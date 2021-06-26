const searchClient = algoliasearch(
    "<enter_app_id",
    "enter_api_key"
);

const search = instantsearch({
    indexName: "instant_search",
    searchClient
});

// adding a widget
// const testWidget = instantsearch.widgets.menu({
//     container: "#test-widget",
//     attribute: "type"
// });

// search.addWidget(testWidget);

// alternative method :
// search.addWidget(
//     instantsearch.widgets.menu({
//         container: "#test-widget",
//         attribute: "type"
//     })
// );

// adding the searchbox widget
search.addWidget(
    instantsearch.widgets.searchBox({
        container: "#searchbox",
        placeholder: "Search for products , brands or category"
    })
);

// adding the hits widget
search.addWidget(
    instantsearch.widgets.hits({
        container: "#hits",
        templates: {
            item: data => `
                <img src = "${data.image}" />
                <div>
                    <div class = "hit-title">
                        <h4>
                            ${instantsearch.highlight({attribute:"name",hit:data})}
                        </h4>
                        <div class = "price">${data.price}</div>
                    </div>
                    <p>${instantsearch.highlight({attribute:"description",hit:data})}</p>
                </div>
            `,
            empty : "<h1> No results . . . Please consider another query </h1>"
        }
    })
);

search.addWidget(
    instantsearch.widgets.refinementList({
        container: "#brands",
        attribute: "brand",
        searchablePlaceholder: "Search for brands",
        sortBy: ["isRefined", "count:desc", "name:asc"]
    })
);

search.addWidget(
    instantsearch.widgets.hierarchicalMenu({
        container: "#categories",
        attributes: [
            "hierarchicalCategories.lvl0",
            "hierarchicalCategories.lvl1",
            "hierarchicalCategories.lvl2"
        ]
    })
);

search.addWidget(
    instantsearch.widgets.rangeInput({
        container: "#price",
        attribute: "price",
        // templates: {
        //     submitText() {
        //         return "Filter";
        //     }
        // },
        // min: 200,
        // max: 400,
    })
);

search.addWidget(
    instantsearch.widgets.clearRefinements({
        container: "#clear-all"
    })
);

search.addWidget(
    instantsearch.widgets.pagination({
        container: "#pagination"
    })
);

search.addWidget(
    instantsearch.widgets.stats({
        container: "#stats",
    })
);
search.start()

// you can now log the object to the console 