let sidebarButton = document.querySelector('.sidebar-toggle-button');
let allTabPanels = document.querySelectorAll(`[data-tab-content]`);
let sidebar = document.querySelector('.sidebar');
let onSideBarbuttonClick = function () {
  // if sidebar has class "collapsed"
  if (sidebar.classList.contains('collapsed')) {
    // remove it
    sidebar.classList.remove('collapsed');
  } else {
    // add it
    sidebar.classList.add('collapsed');
  }
};

sidebarButton.addEventListener('click', onSideBarbuttonClick);

let tabTriggerButtons = document.querySelectorAll('.tabs-trigger');
let onTabTriggerButtonClicked = function (event) {
  let currentButton = event.target;

  for (let i = 0; i < tabTriggerButtons.length; i++) {
    let tabButton = tabTriggerButtons[i];

    tabButton.classList.remove('active');
  }

  currentButton.classList.add('active');

  const tabTarget = currentButton.getAttribute('data-tab-target');

  for (let i = 0; i < allTabPanels.length; i++) {
    let currentTab = allTabPanels[i];
    let tabContentValue = currentTab.getAttribute('data-tab-content');

    if (tabContentValue === tabTarget) {
      currentTab.classList.add('active');
    } else {
      currentTab.classList.remove('active');
    }
  }
};

for (let i = 0; i < tabTriggerButtons.length; i++) {
  let button = tabTriggerButtons[i];

  button.addEventListener('click', onTabTriggerButtonClicked);
}
