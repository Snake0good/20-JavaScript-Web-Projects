const helloGZsection = document.getElementById('hello-guangzhou');
const imgAnchors = document.getElementById('quick-look').querySelectorAll('a');
const peekImgs = document.getElementById('quick-look').querySelectorAll('img');
const eventTitle = document.getElementById('event').querySelector('h1');
const events = document.querySelectorAll('.event-container');
const contactImg = document.getElementById('contact').querySelector('img');
const toggleSwitchWrapper = document.getElementById('theme-switch-wrapper');
const toggleSwitchIcon = toggleSwitchWrapper.querySelector('i');
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const themeStorage = window.localStorage;
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';


//switch theme dynamically
const applyTheme = () => {
    const theme = toggleSwitch.checked ? DARK_THEME : LIGHT_THEME;
    const src = theme === DARK_THEME ? imgDarkLinks : imgLightLinks;

    // theme mode
    themeStorage.setItem('hello-guangzhou-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    toggleSwitchIcon.className = theme === DARK_THEME? 'fas fa-moon' : 'fas fa-sun';

    // hello guangzhou section
    helloGZsection.style.backgroundImage = `url('img/background-${theme}.jpg')`;

    // quick-look section
    for (let i = 0; i < 4; i++) {
        peekImgs[i].setAttribute('src', `img/img${i + 1}-${theme}.jpg`);
        imgAnchors[i].setAttribute('href', src[i]);
    }
    

    //event section
    eventTitle.textContent = theme === DARK_THEME ? 'Night Life' : 'Day Trips';
    events.forEach((event, index) => {
        event.querySelector('h2').textContent = src.events[index].title;
        event.querySelector('img').setAttribute('src', src.events[index].link);
        event.querySelector('p').textContent = src.events[index].description;
    });
    

    //contact section
    contactImg.setAttribute('src', `img/contact-${theme}.svg`);

    
};

toggleSwitch.addEventListener('change', applyTheme);
toggleSwitch.checked = themeStorage.getItem('hello-guangzhou-theme') === 'dark' ? true : false;
applyTheme();