// About Us Page (nosotros.html)
import React from 'react';

const AboutUs = () => {
    // Estilos para simular el miembro del equipo
    const memberStyle = {
        backgroundColor: '#333',
        color: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        flex: '1 1 250px',
        textAlign: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    };

    const avatarStyle = {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginBottom: '1rem',
        border: '3px solid #e53935'
    };
    
    // URL del placeholder adaptado
    const placeholderUrl = "https://placehold.co/150x150/e53935/ffffff?text=AVATAR";

    return (
        <main>
            <section id="nosotros" className="container my-5 text-center">
                <h2 className="text-danger">Quiénes Somos</h2>
                <p className="text-white-50 fs-5 mb-5">
                    En No Hay Excusa, creemos que la transformación personal comienza con el primer paso. Somos un equipo apasionado de entusiastas del fitness, nutricionistas y desarrolladores dedicados a crear una plataforma que no solo ofrece productos y rutinas, sino que inspira un cambio real y duradero en tu vida.
                </p>
                
                <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
                    <div className="team-member" style={memberStyle}>
                        <img src={placeholderUrl} alt="Avatar del desarrollador" style={avatarStyle} />
                        <h3 className="text-white">Ricardo Solís</h3>
                        <p className="text-danger fw-bold">Desarrollador y Fundador</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUs;
