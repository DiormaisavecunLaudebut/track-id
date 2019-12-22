import {  } from './post-show-style'
import {  } from './post-actions-style'

const manageMutations = function(mutationsList, observer) {
  for(let mutation of mutationsList) {
    if (mutation.addedNodes.length > 3) {
      const nodes = Array.from(mutation.addedNodes).filter(e => e.nodeType == 1)
      console.log(nodes)
      if (nodes.find(e => e.classList.value == "post-comments")) {
        // triggers when user open post's conversation
        applyStyleToConversation(nodes)
      } else if (nodes.find(e => e.classList.value == "post-action")) {
        // triggers when user open post's actions (eg: track/comment/share/profil)
        applyStyleToPostActions(nodes)
      }
    }
  }
};

const observer = new MutationObserver(manageMutations);
const config = { attributes: true, childList: true, subtree: true }

const observeDOM = () => {
  observer.observe(document, config)
}

export { observeDOM }
