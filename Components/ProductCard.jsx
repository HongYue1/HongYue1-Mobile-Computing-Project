import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { MyColor } from '../Utils/MyColors';

const ProductCard = ({ item, onPress, addToCart, showAddButton = true, addButtonLabel = 'Add to Cart', style }) => (
  <TouchableOpacity
    style={[styles.card, style]}
    onPress={onPress}
    activeOpacity={0.85}
    accessibilityLabel={`${item.name} product card`}
    accessibilityRole="button"
  >
    <Image source={item.img} style={styles.image} accessibilityLabel={item.name} />
    <View style={styles.infoContainer}>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.weight}>{item.weight} {item.pieces ? `| ${item.pieces}` : ''}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      {showAddButton && addToCart && (
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Text style={styles.addButtonText}>{addButtonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  </TouchableOpacity>
);

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  addToCart: PropTypes.func,
  showAddButton: PropTypes.bool,
  addButtonLabel: PropTypes.string,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  infoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    color: MyColor.primary,
    marginBottom: 2,
  },
  weight: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: MyColor.primary,
    marginBottom: 6,
  },
  addButton: {
    backgroundColor: MyColor.primary,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default memo(ProductCard); 