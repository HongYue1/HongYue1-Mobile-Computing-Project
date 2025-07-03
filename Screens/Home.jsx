import React, { useState, useMemo } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MyColor } from "../Utils/MyColors.js";
import { useFontsLoader } from "../Utils/MyFonts.jsx";
import HomeIcon from "../Components/HomeIcon.jsx";
import { products } from "../Utils/Data.js";
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../Components/ProductCard';

const categories = [
  'All',
  'Fruits',
  'Vegetables',
  'Dairy',
  'Meat',
  'Seeds',
  'AgriTech',
];

const getRandomSamples = (arr, n) => {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const Home = () => {
  const [fontsLoaded] = useFontsLoader();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();

  // Group products by category and pick random samples
  const productSections = useMemo(() => {
    if (selectedCategory === 'All') {
      const sections = {};
      categories.slice(1).forEach(cat => {
        const catProducts = products.filter(p => p.category === cat);
        if (catProducts.length > 0) {
          sections[cat] = getRandomSamples(catProducts, 6);
        }
      });
      return sections;
    } else {
      const catProducts = products.filter(p => p.category === selectedCategory);
      return { [selectedCategory]: getRandomSamples(catProducts, 8) };
    }
  }, [selectedCategory]);

  // Demo testimonial
  const testimonial = {
    quote: '“Harvest Hub delivers the freshest produce right to my door. I love the quality and service!”',
    author: '— Sarah, Cairo'
  };

  const handleNewsletterSignup = () => {
    if (!newsletterEmail.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    Alert.alert("Subscribed!", `You have signed up for the newsletter as ${newsletterEmail}`);
    setNewsletterEmail("");
  };

  const handleProductPress = (item) => {
    navigation.navigate('Product', { productId: item.id });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 140 }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            {/* Hero Section with Gradient and Icon */}
            <LinearGradient
              colors={["#03A791", "#4CD964"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradient}
            >
              <View style={styles.heroContent}>
                <HomeIcon size={0.22} color="#fff" />
                <Text style={styles.heroTitle} numberOfLines={1} adjustsFontSizeToFit={true}>Harvest Hub</Text>
                <Text style={styles.heroSubtitle}>Fresh. Local. Delivered.</Text>
              </View>
            </LinearGradient>
            {/* Category Bar with Rounded Corners (Solid) */}
            <View style={styles.categoryBarWrapper}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScroll}
              >
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryChip, styles.categoryChipRounded, selectedCategory === cat && styles.categoryChipActive]}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text style={[styles.categoryChipText, selectedCategory === cat && styles.categoryChipTextActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            {/* Horizontal Product Lists for Each Category */}
            <Text style={styles.featuredHeader}>Featured Products</Text>
            {Object.entries(productSections).map(([cat, items], idx) => (
              <View key={cat} style={styles.gridSection}>
                <Text style={styles.sectionHeader}>{cat}</Text>
                <FlatList
                  data={items}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <ProductCard item={item} onPress={() => handleProductPress(item)} showAddButton={false} />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                />
              </View>
            ))}
            {/* Newsletter Signup with Gradient */}
            <LinearGradient
              colors={["#03A791", "#4CD964"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.newsletterGradient}
            >
              <Text style={styles.newsletterTitle}>Sign up for our Newsletter</Text>
              <Text style={styles.newsletterSubtitle}>Get the latest updates, offers, and news!</Text>
              <TextInput
                placeholder="Enter your email"
                value={newsletterEmail}
                onChangeText={setNewsletterEmail}
                style={styles.newsletterInput}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#fff"
              />
              <TouchableOpacity style={styles.heroCTAButton} onPress={handleNewsletterSignup}>
                <Text style={styles.heroCTAButtonText}>Subscribe</Text>
              </TouchableOpacity>
            </LinearGradient>
            {/* Why Shop With Us */}
            <View style={styles.whyShopSection}>
              <Text style={styles.whyShopTitle}>Why Shop With Us?</Text>
              <View style={styles.whyShopRow}><Ionicons name="leaf" size={20} color="#03A791" style={{ marginRight: 8 }} /><Text style={styles.whyShopText}>Fresh, local produce</Text></View>
              <View style={styles.whyShopRow}><FontAwesome5 name="shipping-fast" size={18} color="#2196F3" style={{ marginRight: 8 }} /><Text style={styles.whyShopText}>Fast delivery</Text></View>
              <View style={styles.whyShopRow}><Ionicons name="lock-closed" size={20} color="#FFC107" style={{ marginRight: 8 }} /><Text style={styles.whyShopText}>Secure checkout</Text></View>
              <View style={styles.whyShopRow}><MaterialIcons name="support-agent" size={22} color="#FF7043" style={{ marginRight: 8 }} /><Text style={styles.whyShopText}>Friendly support</Text></View>
            </View>
            {/* Testimonial */}
            <View style={styles.testimonialSection}>
              <Text style={styles.testimonialQuote}>{testimonial.quote}</Text>
              <Text style={styles.testimonialAuthor}>{testimonial.author}</Text>
            </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  contentContainer: {
    gap: 20,
    paddingBottom: 20,
  },
  heroGradient: {
    borderRadius: 22,
    marginBottom: 18,
    padding: 0,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#03A791',
  },
  heroContent: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 10,
  },
  heroTitle: {
    fontFamily: 'pacifico',
    fontSize: 30,
    color: '#fff',
    marginTop: 8,
    marginBottom: 2,
    letterSpacing: 1.5,
    paddingHorizontal: 10,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  heroSubtitle: {
    fontFamily: 'LatoRegular',
    fontSize: 17,
    color: '#e0f7f4',
    marginBottom: 10,
  },
  heroCTAContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(3,167,145,0.7)',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  heroCTAButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 2,
  },
  heroCTAButtonText: {
    color: '#03A791',
    fontFamily: 'LatoBold',
    fontSize: 18,
    letterSpacing: 1,
  },
  categoryBarWrapper: {
    height: 54,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingBottom: 2,
    borderRadius: 18,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  categoryScroll: {
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 54,
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
  categoryChipRounded: {
    borderRadius: 18,
  },
  categoryChipText: {
    color: '#03A791',
    fontWeight: '600',
    fontSize: 15,
  },
  categoryChipActive: {
    backgroundColor: '#03A791',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  gridSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#03A791',
    marginBottom: 8,
    marginLeft: 4,
  },
  horizontalList: {
    paddingBottom: 10,
  },
  card: {
    width: 140,
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
    color: '#03A791',
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
    color: '#03A791',
    marginBottom: 6,
  },
  newsletterGradient: {
    borderRadius: 16,
    padding: 18,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  newsletterTitle: {
    fontFamily: 'LatoBold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 4,
  },
  newsletterSubtitle: {
    fontFamily: 'LatoRegular',
    fontSize: 15,
    color: '#fff',
    marginBottom: 10,
  },
  newsletterInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    width: '100%',
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  whyShopSection: {
    backgroundColor: '#e6f7ee',
    borderRadius: 10,
    padding: 18,
    marginTop: 16,
    marginBottom: 10,
    elevation: 1,
  },
  whyShopTitle: {
    fontFamily: 'LatoBold',
    fontSize: 18,
    marginBottom: 8,
    color: '#03A791',
  },
  whyShopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  whyShopText: {
    fontFamily: 'LatoRegular',
    fontSize: 15,
    color: '#333',
  },
  testimonialSection: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  testimonialQuote: {
    fontFamily: 'delius',
    fontSize: 17,
    color: '#03A791',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  testimonialAuthor: {
    fontFamily: 'LatoRegular',
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
  featuredHeader: {
    fontSize: 24,
    fontFamily: "LatoBold",
    color: MyColor.primary,
    marginBottom: 8,
    marginTop: 10,
    textAlign: "left",
    letterSpacing: 1,
  },
});

export default Home;
