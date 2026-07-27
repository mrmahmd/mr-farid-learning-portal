(() => {
  const replacements = {'â€¢':'•','â†’':'→','â†گ':'←','â†‘':'↑','â†“':'↓','âœ“':'✓','âœ¦':'✦','â­گ':'⭐','â€¦':'…','â€”':'—','â€“':'–','âš ':'⚠','âš¡':'⚡','âک°':'☰','âکپ':'☁','ًں”’':'🔒','ًںژ“':'🎓','ًںڈ«':'💡','ًں’،':'💡','ًںھ™':'🪙','âڑ،':'⚡','ًںژپ':'🏆'};
  const repair = value => Object.entries(replacements).reduce((out, [bad, good]) => out.split(bad).join(good), value);
  const run = () => { const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode); nodes.forEach(node=>{const fixed=repair(node.nodeValue); if(fixed!==node.nodeValue) node.nodeValue=fixed;}); };
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
})();
