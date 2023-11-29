import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const RecipeItem = ({ recipe }) => {
  return (
    <View style={styles.recipeItem}>
      {recipe.image && (
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      )}
      <Text style={styles.recipeLabel}>{recipe.label}</Text>
      {/* Render other recipe details here */}
      <Text>Source: {recipe.source}</Text>
      <Text>Yield: {recipe.yield}</Text>
      <Text>Calories: {recipe.calories.toFixed(2)}</Text>
      <Text>Cuisine: {recipe.cuisineType.join(', ')}</Text>
      <Text>Meal Type: {recipe.mealType.join(', ')}</Text>
      <Text>Dish Type: {recipe.dishType.join(', ')}</Text>
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <View style={styles.ingredientsList}>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredientText}>
            {ingredient.text}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recipeItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 5,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  recipeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredientsList: {
    marginTop: 5,
  },
  ingredientText: {
    marginBottom: 5,
  },
  // Add other styles as needed
});

export default RecipeItem;