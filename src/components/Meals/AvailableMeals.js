import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState()
  useEffect(()=>{
    const fetchMeals = async ()=>{
      const response = await fetch("https://tasks-28ec1-default-rtdb.firebaseio.com/meals.json").then()

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json()

      const loadMeals = []
      for(const key in responseData){
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadMeals)
      setIsLoading(false)
    }
    fetchMeals().catch((error)=>{
      setIsLoading(false)
      setHttpError(error.message)
    })
  },[])
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
