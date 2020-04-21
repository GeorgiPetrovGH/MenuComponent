(function ($) { 
    
    function createTabs(configuration, isNested){
        var liCLass = "nested-nav-tab";
        if (!isNested) {
            liCLass = "nav-tab";
        }
        
        var ul = document.createElement("ul");
        if (isNested) {
            ul.classList.add("hidden-sub-items");
        }
        configuration.forEach(el => {
            var li = document.createElement("li");
            li.innerText = el.name;
            li.classList.add(liCLass);

            if (el.nestedTabs) {
                var nestedUl = createTabs(el.nestedTabs, true);
                li.appendChild(nestedUl);
            }

            attachHoverEvent_li(li);
            attachClickEvent_li(li);

            ul.appendChild(li); 
        }); 
        
        return ul;
    }

    function attachHoverEvent_li(li) {    
        li.addEventListener('mouseover', function(e) {
            if (li.classList.contains("nested-nav-tab")) {
                $(li).css('color', 'red');
            }    
            var position = $(li).position();    
            var x = e.clientX,
                y = e.clientY;
            var targetChild = e.target.querySelector('.hidden-sub-items');    
            $(targetChild).css("display", "block");
            // $(targetChild).css("top", (y + 0) + 'px');
            // $(targetChild).css("left", (x + 30) + 'px');

            if (li.classList.contains("nav-tab")){
                $(targetChild).css("top", (position.top + 38) + 'px');
                $(targetChild).css("left", position.left + 'px');
            } else {
                $(targetChild).css("top", position.top + 'px');
                $(targetChild).css("left", (position.left + 75) + 'px');
            }
            
        });
        
        li.addEventListener('mouseleave', function(e) {
            if (li.classList.contains("nested-nav-tab")) {
                $(li).css('color', 'black');
            }  
            var targetChild = e.target.querySelector('.hidden-sub-items');             
            $(targetChild).css("display", "none");
            $(targetChild).css("left", '0px');
        });
    }

    function attachClickEvent_li(li){
        li.addEventListener('click', function(e) {
            var eventElement = document.getElementById("tabs");
            var name = $(li).clone().children().remove().end().text();
            var event = new CustomEvent("select", { "detail": {"name" : name } });
            eventElement.dispatchEvent(event);
        });
    }

    $.fn.createTabs = function(configuration, isNested) {
        this.append(createTabs(configuration, isNested));

        return this;
    }; 
}(jQuery));

$(document).ready(function() {
    var configuration = [
        {
            name: 'Item 1',
            nestedTabs: [
                {
                    name: 'Item 1.1',
                    nestedTabs: [
                        {
                            name: 'Item 1.1.1'
                        },
                        {
                            name: 'Item 1.1.2'
                        },
                        {
                            name: 'Item 1.1.3'
                        }
                    ]
                },
                {
                    name: 'Item 1.2'
                },
                {
                    name: 'Item 1.3'
                }
            ]
        },
        {
            name: 'Item 2',
            nestedTabs: [
                {
                    name: 'Item 2.1',
                    nestedTabs: [
                        {
                            name: 'Item 2.1.1'
                        },
                        {
                            name: 'Item 2.1.2'
                        },
                        {
                            name: 'Item 2.1.3'
                        }
                    ]
                },
                {
                    name: 'Item 2.2'
                },
                {
                    name: 'Item 2.3'
                }
            ]
        },
        {
            name: 'Item 3'
        }
    ];

    $("#tabs").createTabs(configuration, false);
    var eventElement = document.getElementById("tabs");
    eventElement.addEventListener("select", function(e) {
        console.log(e.detail.name); 
    });
});
