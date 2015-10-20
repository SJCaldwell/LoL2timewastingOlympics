function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        rewriteText(node);
    }
}

function rewriteText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                rewriteText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
//Does the text replacement
function replaceText(v)
{
   //Replace League of Legends with Time Wasting Olympics
   v = v.replace(
        /\b(?:League of Legends)|(?:Legends of League)\b/g,
        "Time Wasting Olympics"
    );
   v = v.replace(/\b(?:LEAGUE OF LEGENDS)\b/g, "TIME WASTING OLYMPICS");

   //Changes worlds to something more palatable
   v = v.replace(/\b(?:Worlds)\b/g, "NoogieCon2k15");
   v = v.replace(/\b(?:worlds)\b/g, "NoogieCon2k15");

   //Changes the word Esports
   v = v.replace(/\b(?:Esports)\b/g, "nErdsports");
   v = v.replace(/\b(?:esports)\b/g, "nErdsports");
   v = v.replace(/\b(?:esport)\b/g, "nErdsport"); 
   v = v.replace(/\b(?:esport)\b/g, "nErdsport");



   //Change the word lol and different renditions of it 
   v = v.replace(/\b(?:LOL)\b/g, "laugh out loud ;D");
   v = v.replace(/\b(?:LoL)\b/g, "laugh out loud ;D");
   v = v.replace(/\b(?:lol)\b/g, "laugh out loud ;D");

    return v;
}
walkAndObserve(document);