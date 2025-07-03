import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useUser } from "../Context/UserContext";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { MyColor } from "../Utils/MyColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";

const MyOrders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.uid) return;
      setLoading(true);
      try {
        const ordersRef = collection(db, "orders", user.uid, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersList);
      } catch (e) {
        console.warn("Failed to fetch orders:", e);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user?.uid]);

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderDate}>
        {item.createdAt?.toDate ? format(item.createdAt.toDate(), "PPpp") : "Unknown date"}
      </Text>
      <Text style={styles.orderTotal}>Total: ${item.total?.toFixed(2) ?? "-"}</Text>
      <Text style={styles.orderItemsTitle}>Items:</Text>
      {item.items?.map((prod, idx) => (
        <Text key={idx} style={styles.orderItem}>
          {prod.name} x{prod.quantity} - ${prod.price?.toFixed(2)}
        </Text>
      ))}
      <Text style={styles.orderShippingTitle}>Shipping:</Text>
      <Text style={styles.orderShipping}>{item.shipping?.name}, {item.shipping?.address}, {item.shipping?.city}, {item.shipping?.postalCode}, {item.shipping?.phone}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>My Orders</Text>
        {loading ? (
          <ActivityIndicator size="large" color={MyColor.primary} style={{ marginTop: 40 }} />
        ) : orders.length === 0 ? (
          <Text style={styles.emptyText}>You have no orders yet.</Text>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MyColor.secondary,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: MyColor.secondary,
  },
  title: {
    fontSize: 28,
    fontFamily: "LatoBold",
    color: MyColor.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: MyColor.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  orderDate: {
    fontSize: 15,
    color: MyColor.neutral,
    marginBottom: 6,
    fontFamily: "LatoRegular",
  },
  orderTotal: {
    fontSize: 18,
    color: MyColor.text,
    fontFamily: "LatoBold",
    marginBottom: 6,
  },
  orderItemsTitle: {
    fontSize: 15,
    color: MyColor.primary,
    fontFamily: "LatoBold",
    marginTop: 8,
  },
  orderItem: {
    fontSize: 15,
    color: MyColor.text,
    fontFamily: "LatoRegular",
    marginLeft: 8,
  },
  orderShippingTitle: {
    fontSize: 15,
    color: MyColor.primary,
    fontFamily: "LatoBold",
    marginTop: 10,
  },
  orderShipping: {
    fontSize: 14,
    color: MyColor.neutral,
    fontFamily: "LatoRegular",
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 18,
    color: MyColor.neutral,
    fontFamily: "LatoRegular",
    textAlign: "center",
    marginTop: 40,
  },
});

export default MyOrders; 