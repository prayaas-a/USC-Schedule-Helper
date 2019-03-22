let options;
let count = 3;
$(() => {
    loadOptions(function(recOptions) {
        options = recOptions;

        $("#chkExtensionDisabled").prop('checked', options.extensionEnabled);
        $("#chkConflicts").prop('checked', options.showConflicts);
        $("#chkCalendar").prop('checked', options.showCalendar);
        $("#chkUnits").prop('checked', options.showUnits);
        $('input:checked').trigger('gumby.check');

        $('input').parent().on('gumby.onChange', function() {
            changeOption(this);
        });

        // ===================================================================================================================================================================================
        // =    ===========    ========================================================================  ===================  =====  =======  ===================    =========================
        // ==  ===========  ==  =======================================================================  ===================  =====  =======  ==================  ==  ========================
        // ==  ===========  ========================================  =================================  ===================  =====  =======  ==================  ============================
        // ==  ===  = ===    ======   ===  =   ===  =  = ====   ===    ==  ===   ===  = =========   ===  ======   ===  =  ==  =====  =======  ======   ========    =====  =   ====   ====   ==
        // ==  ===     ===  ======     ==    =  ==        ==  =  ===  =======     ==     =======  =  ==    ===     ==  =  ==  ===    =======    ===  =  ========  ======    =  ==  =  ==  =  =
        // ==  ===  =  ===  ======  =  ==  =======  =  =  =====  ===  ===  ==  =  ==  =  ========  ====  =  ==  =  ==  =  ==  ==  =  =======  =  ==     ========  ======  =======     ==     =
        // ==  ===  =  ===  ======  =  ==  =======  =  =  ===    ===  ===  ==  =  ==  =  =========  ===  =  ==  =  ==  =  ==  ==  =  =======  =  ==  ===========  ======  =======  =====  ====
        // ==  ===  =  ===  ======  =  ==  =======  =  =  ==  =  ===  ===  ==  =  ==  =  =======  =  ==  =  ==  =  ==  =  ==  ==  =  =======  =  ==  =  ========  ======  =======  =  ==  =  =
        // =    ==  =  ===  =======   ===  =======  =  =  ===    ===   ==  ===   ===  =  ========   ===  =  ===   ====    ==  ===    =======    ====   =========  ======  ========   ====   ==
        // ===================================================================================================================================================================================
        $(".secret").click(function() {
            --count;
            if (count == 0) {
                options.showRatings = true;
                saveOptions();
            }
        });
    });
});

document.getElementById("viewInfoText").addEventListener("click", function() {
    toggleCopyright();
});

function changeOption(elem) {
    switch (elem.htmlFor) {
        case "chkExtensionDisabled":
            options.extensionEnabled = $('#chkExtensionDisabled')[0].checked;
            break;
        case "chkCalendar":
            options.showCalendar = $('#chkCalendar')[0].checked;
            break;
        case "chkConflicts":
            options.showConflicts = $('#chkConflicts')[0].checked;
            break;
        case "chkUnits":
            options.showUnits = $('#chkUnits')[0].checked;
            break;
    }
    saveOptions();
}

function saveOptions() {
    chrome.storage.sync.set({
        'options': options
    }, () => {
        sendOptions(options);
    });
}

function toggleCopyright() {
    var info = document.getElementById("copyrightInfo");
    var infotext = document.getElementById("viewInfoText");
    if (info.hasAttribute("hidden")) {
        info.removeAttribute("hidden");
        infotext.innerText = "Hide Copyright Info";
    } else {
        info.setAttribute("hidden", "hidden");
        infotext.innerText = "View Copyright Info";
    }
}
