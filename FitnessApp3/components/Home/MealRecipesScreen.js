import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import RecipeItem from './RecipeItem';

const MealRecipes = ({ route }) => {
  const { mealType, filteredRecipes } = route.params;
  const [mealRecipes, setMealRecipes] = useState([]);

  useEffect(() => {
    const filteredByMealType = filteredRecipes.filter(recipe =>
      recipe.recipe.mealType.includes(mealType)
    );
    setMealRecipes(filteredByMealType);
  }, [mealType, filteredRecipes]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{mealType.toUpperCase()} Recipes</Text>
      <FlatList 
        data={mealRecipes}
        keyExtractor={(item) => item.recipe.uri}
        renderItem={({ item }) => (
          <RecipeItem recipe={item.recipe} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default MealRecipes;