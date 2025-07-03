import React, { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const ProductCarousel = ({ data = [] }) => {
  const navigation = useNavigation();

  const handleProductPress = (item) => {
    navigation.push("Product", {
      productId: item.id,
    });
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={
        (item) =>
          item.id || `product-${item.name}-${item.price}-${Math.random()}` // Make key more unique
      }
      renderItem={({ item }) => (
        <ProductCard item={item} onPress={() => handleProductPress(item)} showAddButton={false} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

ProductCarousel.propTypes = {
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 15,
    paddingLeft: 5,
  },
});

export default memo(ProductCarousel);
