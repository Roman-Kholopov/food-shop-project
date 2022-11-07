import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { getMealById } from '../api'
import { Preloader } from '../components/Preloader'

    // читать про includes!!!!!!!!
    // читать про  iframe!!!!!!!!!
    // читать про Object.keys!!!!!


function Recipe() {
    const [recipe, setRecipe] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const {
        idMeal,
        strMeal,
        // strDrinkAlternate,
        strCategory,
        strArea,
        strInstructions,
        strMealThumb,
        // strTags,
        strYoutube,
    } = recipe;

    useEffect(() => {
        getMealById(id)
            .then(data => setRecipe(data.meals[0]))
    }, [id])

    return (
        <>
        <div>
            {!idMeal ? <Preloader/> : (
                <div className="recipe">
                    <img src={strMealThumb} alt={strMeal} />
                    <h1>{strMeal}</h1>
                    <h6>Category: {strCategory}</h6>
                    {strArea ? <h6>Area: {strArea}</h6> : null}
                    <p>{strInstructions}</p>

                    <table className='centered'>
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Measure</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(recipe).map(key => {
                                    if(key.includes('Ingredient') && recipe[key]) {
                                        return (
                                            <tr key={key}>
                                                <td>{recipe[key]}</td>
                                                <td>{
                                                    recipe[`strMeasure${key.slice(13)}`]
                                                }</td>
                                            </tr>
                                        )
                                    }
                                    return null;
                                })
                            }
                        </tbody>
                    </table>

                    {strYoutube ? (
                        <div className="row">
                            <h5 style={{ margin: '2rem 0 1.5rem'}}>Video Recipe</h5>
                            <iframe title={id} src={`https://www.youtube.com/embed/${strYoutube.slice(-11)}`} allowFullScreen/>
                        </div>
                    )  : null}
                </div>
            )}
        </div>
        <button className='btn' onClick={() => navigate(-1)}>Go Back</button>
        </>
    )
}

export { Recipe };