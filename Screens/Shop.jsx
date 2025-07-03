import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { products } from '../Utils/Data.js';
import { useCart } from '../Context/CartContext';
import ProductCard from '../Components/ProductCard';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  'All',
  'Fruits',
  'Vegetables',
  'Dairy',
  'Meat',
  'Seeds',
  'AgriTech',
];

const Shop = () => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProduct = ({ item }) => (
    <ProductCard
      item={item}
      onPress={() => navigation.navigate('Product', { productId: item.id })}
      addToCart={addToCart}
      showAddButton={true}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }} edges={["top"]}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Shop</Text>
      </View>
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.clearIconTouchable}>
              <Ionicons name="close-circle" size={20} color="#aaa" style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.categoryBarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryChip, selectedCategory === cat && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={[styles.categoryChipText, selectedCategory === cat && styles.categoryChipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={11}
        ListEmptyComponent={<Text style={styles.noResults}>No products found.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 10,
    paddingBottom: 2,
    backgroundColor: '#f5f5f5',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#03A791',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  searchBarWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchBar: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#333',
    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  clearIconTouchable: {
    padding: 4,
  },
  clearIcon: {
    marginLeft: 4,
  },
  categoryBarWrapper: {
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingBottom: 2,
  },
  categoryScroll: {
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 48,
  },
  categoryChip: {
    backgroundColor: '#e0f2f1',
    borderRadius: 18,
    paddingVertical: 7,
    paddingHorizontal: 18,
    marginRight: 10,
    marginBottom: 5,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#03A791',
  },
  categoryChipText: {
    color: '#03A791',
    fontWeight: '600',
    fontSize: 15,
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  grid: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  noResults: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 16,
    marginTop: 40,
  },
});

export default Shop; 