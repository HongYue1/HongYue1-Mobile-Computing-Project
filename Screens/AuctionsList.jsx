import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MyColor } from '../Utils/MyColors';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

function getTimeRemaining(endTime, nowOverride) {
  const now = nowOverride !== undefined ? nowOverride : Date.now();
  const total = Date.parse(endTime) - now;
  if (total <= 0) return 'Ended';
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return `${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s`;
}

const AuctionsList = () => {
  const navigation = useNavigation();
  const [now, setNow] = useState(Date.now());
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'auctions'), orderBy('endTime', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      setAuctions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const renderAuction = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('AuctionDetails', { auctionId: item.id })}
      accessibilityLabel={`${item.title} auction card`}
      accessibilityRole="button"
    >
      <Image source={{ uri: item.image }} style={styles.image} accessibilityLabel={item.title} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.currentBid}>
          Current Bid: ${
            typeof item.currentBid === 'number'
              ? item.currentBid.toFixed(2)
              : !isNaN(parseFloat(item.currentBid))
                ? parseFloat(item.currentBid).toFixed(2)
                : '0.00'
          }
        </Text>
        <Text style={styles.timeRemaining}>Time Left: {getTimeRemaining(item.endTime, now)}</Text>
        <Text style={styles.bidsCount}>{item.bids?.length || 0} bids</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Text style={styles.header}>Auctions</Text>
      <FlatList
        data={auctions}
        keyExtractor={item => item.id}
        renderItem={renderAuction}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MyColor.secondary,
  },
  header: {
    fontSize: 28,
    fontFamily: 'LatoBold',
    color: MyColor.primary,
    alignSelf: 'center',
    paddingTop: 18,
    paddingBottom: 10,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,

  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 14,
    marginRight: 18,
    backgroundColor: MyColor.neutral2,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'LatoBold',
    fontSize: 18,
    color: MyColor.text,
    marginBottom: 2,
  },
  currentBid: {
    fontFamily: 'LatoRegular',
    fontSize: 15,
    color: MyColor.primary,
    marginBottom: 2,
  },
  timeRemaining: {
    fontFamily: 'LatoRegular',
    fontSize: 14,
    color: MyColor.warning,
    marginBottom: 2,
  },
  bidsCount: {
    fontFamily: 'LatoRegular',
    fontSize: 13,
    color: MyColor.neutral,
  },
});

export default AuctionsList; 