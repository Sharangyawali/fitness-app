

import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import RecipeItem from './RecipeItem';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Receipe= () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState('');

  const navigation = useNavigation();

  const fetchRecipes = async () => {
    try {
      const appId = '39810eb9';
      const appKey = 'e3fe97a525230ea92f5324613bf0f2d0';
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appId}&app_key=${appKey}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setRecipes(data.hits);

      // Filter recipes for the searched food item
      const filtered = data.hits.filter(recipe =>
        recipe.recipe.label.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredRecipes(filtered);

    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // const onRecipePress = (recipe) => {
  //   navigation.navigate('RecipeDetails', { recipe });
  // };

  const onSectionPress = (mealType) => {
    navigation.navigate('MealRecipes', {
      mealType,
      filteredRecipes,
    });
  };

  const handleMealTypeChange = (value) => {
    setSelectedMealType(value);
    if (value === '') {
      setFilteredRecipes(recipes);
    } else {
      const filteredByMealType = recipes.filter(recipe =>
        recipe.recipe.mealType.includes(value.toLowerCase())
      );
      setFilteredRecipes(filteredByMealType);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholder="Search for a food..."
        style={styles.input}
      />

      <Picker
        selectedValue={selectedMealType}
        onValueChange={handleMealTypeChange}
        style={styles.picker}
      >
        <Picker.Item label="All Meals" value="" />
        <Picker.Item label="Breakfast" value="breakfast" />
        <Picker.Item label="Lunch" value="lunch" />
        <Picker.Item label="Dinner" value="dinner" />
      </Picker>
      
      <TouchableOpacity style={styles.searchButton} onPress={fetchRecipes}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>



      {filteredRecipes.length > 0 && (
        <FlatList 
          data={filteredRecipes}
          keyExtractor={(item) => item.recipe.uri}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSectionPress(item.recipe)}>
              <RecipeItem recipe={item.recipe} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'white', // Set the background color
    paddingLeft: 10, // Add padding to align text properly
  }
});

export default Receipe;