import { useNavigate  } from 'react-router-dom';

import { Meal } from './Meal'

function MealList({meals}) {
    const navigate = useNavigate();

    return (
        <>
        <button className='btn' onClick={() => navigate(-1)}>Go Back</button>
        
        <div className="list">
            {meals.map(meal => (
                <Meal key={meal.idMeal} {...meal}/>
            ))}
        </div>
        </>
        
    )
}

export { MealList };