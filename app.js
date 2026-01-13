// Website content and structure
const websiteContent = {
    title: 'PWT - Power Wash Technologies',
    subtitle: 'Professional commercial kitchen hood cleaning services',
    buttons: [
        { text: 'About Us', target: 'about' },
        { text: 'Our Services', target: 'services' }
    ],
    templates: [
        'Restaurants',
        'Fast Food',
        'Commercial Kitchens',
        'Regular Maintenance'
    ],
    sections: [
        {
            id: 'about',
            title: 'About PWT',
            content: 'PWT specializes in professional commercial kitchen hood cleaning services for restaurants and businesses. We clean the exhaust hoods above grills and cooking equipment, ensuring they meet safety standards and operate efficiently.'
        },
        {
            id: 'services',
            title: 'Our Services',
            content: 'PWT has a good quality cleaning for businesses from A to Z. We have served for A&W, Burger King, and McDonalds, but not all we do is for fast food. We are happy to help with any food related business that could have its hood be cleaned. We will also always abide by the businesses rules when cleaning, but we still do have the right to refuse service if you decide to give us a hard time doing our job for no reason.'
        }
    ]
};

// Create element helper function
function createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

// Build the website
function buildWebsite() {
    const app = document.getElementById('app');
    
    // Create container
    const container = createElement('div', 'container');
    
    // Create title
    const title = createElement('h1', null, websiteContent.title);
    container.appendChild(title);
    
    // Create subtitle
    const subtitle = createElement('p', null, websiteContent.subtitle);
    container.appendChild(subtitle);
    
    // Create button container
    const buttonContainer = createElement('div', 'button-container');
    
    // Create buttons
    websiteContent.buttons.forEach(buttonData => {
        const button = createElement('button', 'btn', buttonData.text);
        button.addEventListener('click', () => {
            // Hide all sections first
            document.querySelectorAll('.content-section').forEach(sec => {
                sec.classList.remove('visible');
            });
            
            // Show the selected section
            const section = document.getElementById(buttonData.target);
            if (section) {
                section.classList.add('visible');
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
        buttonContainer.appendChild(button);
    });
    
    container.appendChild(buttonContainer);
    
    // Create template grid
    const templateGrid = createElement('div', 'template-grid');
    
    websiteContent.templates.forEach(templateText => {
        const templateBox = createElement('div', 'template-box', templateText);
        templateGrid.appendChild(templateBox);
    });
    
    container.appendChild(templateGrid);
    
    // Create content sections
    websiteContent.sections.forEach(sectionData => {
        const section = createElement('section', 'content-section');
        section.id = sectionData.id;
        
        const sectionTitle = createElement('h2', null, sectionData.title);
        section.appendChild(sectionTitle);
        
        const sectionContent = createElement('p', null, sectionData.content);
        section.appendChild(sectionContent);
        
        container.appendChild(section);
    });
    
    // Add container to app
    app.appendChild(container);
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', buildWebsite);
