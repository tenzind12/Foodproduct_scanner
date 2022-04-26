import { View, Text, Image, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
// import { saveAlert } from '../services/Service';
import Nutriments from '../components/Nutriments';
import Nutriscore from '../components/Nutriscore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SavedProducts from './SavedProducts';
import RecipeList from './RecipeList';

export default function Product({ products, recipes, setRecipeIngredient, setPossibleRecipes }) {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [pageChange, setPageChange] = useState(true);

  const [showRecipePage, setShowRecipePage] = useState(false);

  // A D D   B U T T O N   H A N D L E R
  const saveItemHandler = () => {
    const newCurrentProducts = [
      ...currentProducts,
      {
        id: Date.now(),
        name: products.product.product_name,
        image: products.product.image_front_small_url,
        rating: products.product.nutriscore_grade,
      },
    ];
    // check if already saved
    if (currentProducts.length > 0) {
      currentProducts.forEach((product) => {
        if (product.name === products.product.product_name) {
          alert('This product is already saved');
        } else {
          setCurrentProducts(newCurrentProducts);
          alert('Item has been saved to your list');
        }
      });
    } else {
      setCurrentProducts(newCurrentProducts);
      alert('Item has been saved to your list');
    }
    Vibration.vibrate(100);
  };

  // D E L E T E   B U T T O N   H A N D L E R
  const deleteHandler = (id) => {
    return () => {
      const newCurrentProducts = currentProducts.filter((item) => item.id !== id);
      setCurrentProducts(newCurrentProducts);
    };
  };

  // getting localstorage
  useEffect(() => {
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    AsyncStorage.getItem('items')
      .then((response) => JSON.parse(response || '[]'))
      .then((data) => setCurrentProducts(data));
  };

  // localstorage saving
  const saveLocalStorage = () => {
    AsyncStorage.setItem('items', JSON.stringify(currentProducts));
  };

  useEffect(() => {
    saveLocalStorage();
  }, [currentProducts]);

  if (pageChange) {
    return (
      products !== null && (
        <View style={styles.container}>
          <Text style={styles.name}>{products.product.product_name}</Text>
          <Image
            source={{
              uri: products.product.image_front_small_url
                ? products.product.image_front_small_url
                : 'https://orbis-alliance.com/wp-content/themes/consultix/images/no-image-found-360x260.png',
            }}
            style={styles.image}
          />

          {/* nutriscore = undefined ? errorMessage : afficher le score */}
          {products.product.nutriscore_grade === undefined ? (
            <Text style={styles.noScoreMessage}>This item doesn't have a nutriscore value</Text>
          ) : (
            <Nutriscore nutriscore_grade={products.product.nutriscore_grade} />
          )}

          {/* ============== link button for viewing recipe results ============ */}
          <View style={styles.recipeButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowRecipePage(!showRecipePage);
                Vibration.vibrate(50);
              }}
            >
              <Text style={styles.recipeButton}>
                {' '}
                {showRecipePage ? 'Go back' : recipes.length + ' possible recipes'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRecipeIngredient([]);
                setPossibleRecipes([]);
                Vibration.vibrate(50);
              }}
            >
              <Text style={styles.recipeResetButton}>Reset</Text>
            </TouchableOpacity>
          </View>

          {showRecipePage && <RecipeList recipes={recipes} />}

          {/* show nutrivalue and three buttons if recipes are hidden */}
          {!showRecipePage && (
            <>
              {/* nutrition scores component*/}
              <Nutriments nutriments={products.product.nutriments} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.listBtn}
                  onPress={() => {
                    setPageChange(false);
                    Vibration.vibrate(50);
                  }}
                >
                  <Text>Your Items</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={saveItemHandler}>
                  <Text>Save item</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )
    );
  } else {
    return (
      <SavedProducts
        setPageChange={setPageChange}
        storedItems={currentProducts}
        deleteHandler={deleteHandler}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    alignItems: 'center',
  },
  name: {
    fontWeight: '100',
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  noScoreMessage: {
    backgroundColor: 'teal',
    color: 'white',
    marginTop: 10,
    padding: 5,
    borderRadius: 7,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  listBtn: {
    borderColor: 'skyblue',
    borderWidth: 1,
    padding: 5,
    borderRadius: 7,
    marginRight: 10,
  },
  saveBtn: {
    borderColor: 'green',
    borderWidth: 1,
    padding: 5,
    borderRadius: 7,
    marginLeft: 10,
  },
  recipeButton: {
    color: 'white',
    borderColor: 'skyblue',
    borderWidth: 1,
    padding: 5,
    backgroundColor: 'gold',
    borderRadius: 50,
    marginTop: 5,
  },
  recipeResetButton: {
    backgroundColor: 'brown',
    borderColor: 'skyblue',
    color: 'white',
    borderWidth: 1,
    padding: 5,
    borderRadius: 50,
    marginTop: 5,
    marginLeft: 5,
  },
  recipeButtonContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});
