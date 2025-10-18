import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const NutritionalCalculator = () => {
    const [weight, setWeight] = useState('');
    const [goal, setGoal] = useState('mantener');
    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const w = parseFloat(weight);
        if (isNaN(w) || w <= 0) {
            setResult({ message: 'Ingresa un peso válido.', type: 'error' });
            return;
        }

        let proteinFactor = 1.8;
        if (goal === 'mantener') proteinFactor = 1.2;
        if (goal === 'ganar') proteinFactor = 2.0;

        const proteinNeeded = (w * proteinFactor).toFixed(1);
        setResult({ 
            message: `Necesitas consumir aproximadamente ${proteinNeeded}g de proteína al día.`, 
            type: 'success',
            proteinNeeded: proteinNeeded
        });
    };

    const cardStyle = { backgroundColor: '#333', color: '#fff', border: '1px solid #e53935' };
    const resultStyle = result && result.type === 'success' ? { backgroundColor: '#4CAF50', color: 'white' } : { backgroundColor: '#e53935', color: 'white' };

    return (
        <Card className="my-5 shadow-lg" style={cardStyle}>
            <Card.Body>
                <Card.Title className="text-danger mb-4">Calculadora Nutricional Rápida</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formWeight">
                        <Form.Label>Tu peso (kg)</Form.Label>
                        <Form.Control 
                            type="number" 
                            name="weight" 
                            value={weight} 
                            onChange={(e) => setWeight(e.target.value)} 
                            style={{ backgroundColor: '#222', color: '#fff', borderColor: '#555' }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formGoal">
                        <Form.Label>Tu objetivo</Form.Label>
                        <Form.Select 
                            name="goal" 
                            value={goal} 
                            onChange={(e) => setGoal(e.target.value)} 
                            style={{ backgroundColor: '#222', color: '#fff', borderColor: '#555' }}
                        >
                            <option value="perder">Perder Peso</option>
                            <option value="mantener">Mantener Peso</option>
                            <option value="ganar">Ganar Músculo</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="danger" type="submit" className="w-100" style={{ backgroundColor: '#e53935', borderColor: '#e53935', fontWeight: 700 }}>
                        Calcular Proteína
                    </Button>
                </Form>
                
                {result && (
                    <div className="mt-4 p-3 rounded fw-bold" style={resultStyle}>
                        {result.message}
                        {result.proteinNeeded && (
                           <p className="mt-2 mb-0">¡Considera comprar nuestra Proteína en Polvo para alcanzar tu meta!</p>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default NutritionalCalculator;
