import ProjectCard from '../components/Portafolio/ProjectCard'; 
import React from 'react';
import { act } from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom/client'; 

describe('ProjectCard Component (Prueba Unitaria IL2.2)', function() {
  let container;
  let root;

  beforeEach(function() {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  });

  afterEach(function() {
    act(() => {
      root.unmount(); 
    });
    document.body.removeChild(container);
    container = null;
  });

  it('debería renderizar el título y la descripción correctamente', function() {
    act(() => {
        root.render(
            <ProjectCard 
                title="Mi Proyecto de Prueba" 
                description="Esta es una breve descripción." 
                techs="React" 
                demoLink="#" 
            />
        );
    });

    const cardTitle = container.querySelector('.card-title');
    const cardText = container.querySelector('.card-text');
    const button = container.querySelector('.btn');
    
    expect(cardTitle).not.toBeNull('El título de la tarjeta no fue encontrado (clase .card-title)');
    expect(cardText).not.toBeNull('El texto de la tarjeta no fue encontrado (clase .card-text)');
    expect(button).not.toBeNull('El botón no fue encontrado (clase .btn)');
    expect(cardTitle.textContent.trim()).toBe('Mi Proyecto de Prueba');
    expect(cardText.textContent.trim()).toBe('Esta es una breve descripción.');
    expect(button.textContent.trim()).toBe('Ver Proyecto');
  });

  it('debería verificar que el enlace (demoLink) está configurado correctamente', function() {
    const testLink = 'https://github.com/my-test-project';
    
    act(() => {
        root.render(
            <ProjectCard 
                title="Test" 
                description="Test" 
                techs="Test" 
                demoLink={testLink} 
            />
        );
    });

    const button = container.querySelector('.btn');
    
    expect(button).not.toBeNull('El botón no fue encontrado');
    expect(button.getAttribute('href')).toBe(testLink);
  });
});