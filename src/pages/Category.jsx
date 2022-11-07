import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getFilterByCategory } from '../api'
import { Preloader } from '../components/Preloader'
import { MealList } from '../components/MealList'

function Category() {
    const [meals = [], setMeals] = useState()
    const { name } = useParams();

    useEffect(() => {
        getFilterByCategory(name)
            .then(data => setMeals(data.meals))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])

    return (
        <>
            {!meals.length ? <Preloader /> : <MealList meals={meals}/>}
        </>
    )
};

export { Category };