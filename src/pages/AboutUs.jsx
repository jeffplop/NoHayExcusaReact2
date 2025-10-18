import React, { useState } from 'react'; 
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import newsData from '../data/news.json'; 

const ProjectCard = ({ title, description, techs, demoLink }) => (
    <Card className="mb-4 h-100 shadow-sm" bg="dark" text="white" border="danger">
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer className="bg-secondary text-white-50">
            <small>Tecnologías: {techs}</small>
            <Button variant="outline-light" size="sm" href={demoLink} target="_blank" className="float-end">
                Ver
            </Button>
        </Card.Footer>
    </Card>
);

const NewsItem = ({ title, date, content }) => (
    <div className="mb-4 p-3 border-start border-4 border-danger bg-light text-dark shadow-sm">
        <h5>{title}</h5>
        <p className="text-muted small mb-1">{date}</p>
        <p>{content}</p>
    </div>
);

const AboutUs = () => {
    const [news] = useState(newsData); 
    const projects = [
        {
            id: 1,
            title: 'NOHAYEXCUSA.CL (E-commerce)',
            description: 'Plataforma de comercio electrónico con autenticación y carrito persistente.',
            techs: 'React, Node.js (Express), Bootstrap',
            demoLink: '#' 
        },
        {
            id: 2,
            title: 'Proyecto BMI',
            description: 'Aplicación Buscador de Manuales de Indicadores de Pesaje',
            techs: 'Android Studio, Kotlin',
            demoLink: '#'
        },
        {
            id: 3,
            title: 'Indicador Bluetooth (PROXIMAMENTE)',
            description: 'Una Aplicación para PC al respectivo LP7516B',
            techs: 'Desconocido aún',
            demoLink: '#'
        }
    ];

    return (
        <main>
            <Container className="my-5 text-white">
                <Row className="text-center mb-5 p-5 bg-dark rounded shadow-lg">
                    <Col>
                        <img 
                            src="/images/charlie.jpg" 
                            alt="Foto del Estudiante" 
                            className="rounded-circle mb-3 border border-danger border-4" 
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                        />
                        <h1 className="display-4 text-danger">¡Hola Soy Jeff!</h1>
                        <p className="lead">
                            Estudiante de Ingenería en Informatica | Me gusta arruinar mi felicidad y vivir con angustía
                        </p>
                    </Col>
                </Row>
                <h2 className="text-danger mb-4">Proyectos Destacados</h2>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {projects.map(project => (
                        <Col key={project.id}>
                            <ProjectCard {...project} />
                        </Col>
                    ))}
                </Row>
                <h2 className="text-danger mt-5 mb-4">Noticias de Desarrollo</h2>
                <Row>
                    <Col md={8} className="mx-auto">
                        {news.map(item => (
                            <NewsItem 
                                key={item.id} 
                                title={item.titulo} 
                                date={item.fecha} 
                                content={item.contenido_breve} 
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default AboutUs;