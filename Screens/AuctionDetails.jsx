import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, Button, Alert, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useUser } from '../Context/UserContext';
import { MyColor } from '../Utils/MyColors';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Share } from 'react-native';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, onSnapshot, arrayUnion } from 'firebase/firestore';

function getTimeRemaining(endTime, nowOverride) {
  const now = nowOverride !== undefined ? nowOverride : Date.now();
  const total = Date.parse(endTime) - now;
  if (total <= 0) return { ended: true, text: 'Auction Ended' };
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    ended: false,
    text: `${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s`
  };
}

const AuctionDetails = () => {
  const route = useRoute();
  const { auctionId } = route.params || {};
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [now, setNow] = useState(Date.now());
  const { user } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (!auctionId) return;
    const unsub = onSnapshot(doc(db, 'auctions', auctionId), (docSnap) => {
      if (docSnap.exists()) {
        setAuction({ id: docSnap.id, ...docSnap.data() });
      } else {
        setAuction(null);
      }
    });
    return unsub;
  }, [auctionId]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!auction) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: MyColor.error, fontWeight: 'bold', fontFamily: 'LatoBold' }}>Auction not found.</Text>
      </View>
    );
  }

  const time = getTimeRemaining(auction.endTime, now);
  const auctionEnded = time.ended;
  const bids = auction.bids || [];
  const currentBid = typeof auction.currentBid === 'number' ? auction.currentBid : 0;

  const handlePlaceBid = async () => {
    const amount = parseFloat(bidAmount);
    if (auctionEnded) {
      Alert.alert('Auction Ended', 'You cannot bid on an ended auction.');
      return;
    }
    if (isNaN(amount) || amount <= currentBid) {
      Alert.alert('Invalid Bid', `Bid must be greater than current bid ($${(typeof currentBid === 'number' ? currentBid : 0).toFixed(2)})`);
      return;
    }
    try {
      const bid = {
        user: user.name || user.email || 'User',
        amount,
        time: new Date().toISOString(),
      };
      await updateDoc(doc(db, 'auctions', auctionId), {
        bids: arrayUnion(bid),
        currentBid: amount,
      });
      setBidAmount('');
      Alert.alert('Bid Placed', `Your bid of $${amount.toFixed(2)} has been placed!`);
    } catch (e) {
      Alert.alert('Error', 'Failed to place bid. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this auction: ${auction.title} - Current bid: $${(typeof currentBid === 'number' ? currentBid : 0).toFixed(2)}!`,
        title: auction.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share auction.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <View style={styles.heroImageCard}>
            <Image source={{ uri: auction.image }} style={styles.heroImage} resizeMode="cover" accessibilityLabel={auction.title} />
            <View style={styles.headerButtonsOverlay}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.iconButton, { backgroundColor: '#F2F2F2' }]}
                accessibilityLabel="Go back"
                accessibilityRole="button"
              >
                <Ionicons name="chevron-back" size={24} color={MyColor.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: '#F2F2F2' }]}
                onPress={handleShare}
                accessibilityLabel="Share this auction"
                accessibilityRole="button"
              >
                <Feather name="share" size={22} color={MyColor.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>{auction.title}</Text>
            </View>
          </View>
          <View style={styles.infoCardSpacer} />
          <View style={styles.infoCard}>
            <Text style={styles.description}>{auction.description}</Text>
            <Text style={styles.currentBid}>Current Bid: ${(typeof currentBid === 'number' ? currentBid : 0).toFixed(2)}</Text>
            <Text style={[styles.time, auctionEnded && styles.timeEnded]}>{time.text}</Text>
            <Text style={styles.endsAt}>Ends: {new Date(auction.endTime).toLocaleString()}</Text>
            <View style={styles.bidRow}>
              <TextInput
                placeholder="Enter your bid"
                value={bidAmount}
                onChangeText={setBidAmount}
                keyboardType="numeric"
                style={styles.input}
                editable={!auctionEnded}
                placeholderTextColor={MyColor.neutral}
                accessibilityLabel="Enter your bid"
              />
              <TouchableOpacity
                style={[styles.placeBidButton, auctionEnded && styles.placeBidButtonDisabled]}
                onPress={handlePlaceBid}
                disabled={auctionEnded}
                accessibilityLabel="Place Bid"
                accessibilityRole="button"
              >
                <Text style={styles.placeBidButtonText}>{auctionEnded ? 'Ended' : 'Place Bid'}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.bidsHeader}>Bids:</Text>
            {bids.length === 0 ? (
              <Text style={styles.noBids}>No bids yet. Be the first to bid!</Text>
            ) : (
              <View style={{ marginTop: 6 }}>
                {bids.map((item, idx) => (
                  <View key={idx} style={styles.bidItem}>
                    <Text style={styles.bidUser}>{item.user}</Text>
                    <Text style={styles.bidAmount}>${(typeof item.amount === 'number' ? item.amount : 0).toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MyColor.secondary,
  },
  heroImageCard: {
    width: '95%',
    aspectRatio: 1.1,
    position: 'relative',
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    marginBottom: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'LatoBold',
    color: MyColor.black,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  infoCardSpacer: {
    height: 29,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 22,
    marginHorizontal: 18,
    marginTop: 0,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 2,
    marginBottom: 18,
    minHeight: 220,

  },
  description: {
    fontFamily: 'LatoRegular',
    fontSize: 15,
    color: '#444',
    marginBottom: 10,
  },
  currentBid: {
    fontFamily: 'LatoBold',
    fontSize: 18,
    color: MyColor.primary,
    marginBottom: 6,
  },
  time: {
    fontFamily: 'LatoRegular',
    fontSize: 16,
    color: MyColor.warning,
    marginBottom: 6,
  },
  timeEnded: {
    color: MyColor.error,
    fontWeight: 'bold',
  },
  endsAt: {
    fontFamily: 'LatoRegular',
    fontSize: 13,
    color: MyColor.neutral,
    marginBottom: 10,
  },
  bidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginRight: 10,
    backgroundColor: MyColor.neutral2,
    fontSize: 16,
    fontFamily: 'LatoRegular',
  },
  placeBidButton: {
    backgroundColor: MyColor.primary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeBidButtonDisabled: {
    backgroundColor: MyColor.neutral,
  },
  placeBidButtonText: {
    color: '#fff',
    fontFamily: 'LatoBold',
    fontSize: 16,
  },
  bidsHeader: {
    fontFamily: 'LatoBold',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
    color: MyColor.text,
  },
  bidItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: MyColor.neutral2,
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  bidUser: {
    fontFamily: 'LatoBold',
    color: MyColor.text,
  },
  bidAmount: {
    color: MyColor.primary,
    fontFamily: 'LatoBold',
  },
  noBids: {
    color: MyColor.neutral,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'LatoRegular',
  },
  headerButtonsOverlay: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 20,
  },
  iconButton: {
    backgroundColor: MyColor.secondary,
    borderRadius: 25,
    padding: 10,
    shadowColor: MyColor.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default AuctionDetails; 