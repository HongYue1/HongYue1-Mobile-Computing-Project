import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyColor } from '../Utils/MyColors';
import { useNavigation } from '@react-navigation/native';

const blogData = [
  {
    id: 'blog-001',
    title: '5 Tips for Growing Juicy Tomatoes',
    image: require('../assets/blog/1.jpg'),
    summary: 'Discover how to grow the best tomatoes in your garden with these expert tips.',
    date: '2025-06-01',
    author: {
      name: 'Sarah Green',
      avatar: require('../assets/People/woman2.jpg'),
    },
    tags: ['Tomato', 'Gardening', 'Tips'],
    content: `
Tomatoes are a staple in many gardens, but getting them to grow juicy and flavorful can be a challenge. Here are five expert tips to help you succeed:

1. Choose the Right Variety: Select tomato varieties suited to your climate and intended use (slicing, canning, cherry, etc.).
2. Plant Deeply: Bury two-thirds of the stem when transplanting. Tomatoes grow roots along their stems, making them stronger.
3. Water Consistently: Keep soil evenly moist, especially during fruiting. Inconsistent watering can cause cracking and blossom end rot.
4. Feed Regularly: Use a balanced fertilizer or compost. Tomatoes are heavy feeders and benefit from extra nutrients.
5. Prune and Support: Remove lower leaves and suckers, and use cages or stakes to keep plants upright and healthy.

With these tips, you\'ll be harvesting juicy, delicious tomatoes all season long!`
  },
  {
    id: 'blog-002',
    title: 'Strawberry Season: How to relocate saplings',
    image: require('../assets/blog/2.jpg'),
    summary: 'Strawberries are in season! Learn how to planet, relocate, and grow them.',
    date: '2025-05-20',
    author: {
      name: 'John Berry',
      avatar: require('../assets/People/man2.jpg'),
    },
    tags: ['Strawberry', 'Saplings', 'Seasonal'],
    content: `
Strawberries are a rewarding crop, but to keep your patch productive, it\'s important to relocate saplings every few years. Here\'s how:

- Timing: Move saplings in early spring or late fall when the weather is cool.
- Preparation: Choose a sunny, well-drained spot. Amend the soil with compost for best results.
- Dig Carefully: Gently lift young plants, keeping as much root as possible.
- Spacing: Plant saplings 12-18 inches apart to allow for spreading.
- Water Well: Keep the soil moist (but not soggy) for the first few weeks.

Relocating saplings helps prevent disease and encourages bigger, sweeter berries!`
  },
  {
    id: 'blog-003',
    title: 'Organic Farming: The Future of Agriculture',
    image: require('../assets/blog/3.jpg'),
    summary: 'Explore the benefits and challenges of organic farming in today\'s world.',
    date: '2025-05-10',
    author: {
      name: 'Alex Fields',
      avatar: require('../assets/People/man1.jpg'),
    },
    tags: ['Organic', 'Farming', 'Sustainability'],
    content: `
Organic farming is gaining popularity as consumers seek healthier, more sustainable food. Here\'s what you need to know:

- No Synthetic Chemicals: Organic farmers use natural fertilizers and pest control methods, protecting soil and water.
- Crop Rotation & Diversity: Rotating crops and planting diverse species improves soil health and reduces pests.
- Certification: To be labeled organic, farms must meet strict standards and undergo regular inspections.
- Challenges: Organic farming can be more labor-intensive and may yield less, but often commands higher prices.
- Benefits: Healthier food, improved biodiversity, and a smaller environmental footprint.

Organic farming is not just a trend—it's a movement toward a more sustainable future!`
  },
];

const BlogList = () => {
  const navigation = useNavigation();
  const renderBlog = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={`Read article: ${item.title}`}
      onPress={() => navigation.navigate('BlogDetail', { blog: item })}
    >
      <Image source={item.image} style={styles.image} accessibilityLabel={item.title} />
      <View style={styles.infoContainer}>
        <View style={styles.rowBetween}>
          <View style={styles.authorRow}>
            <Image source={item.author.avatar} style={styles.avatar} accessibilityLabel={item.author.name} />
            <Text style={styles.authorName}>{item.author.name}</Text>
          </View>
          <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary} numberOfLines={3}>{item.summary}</Text>
        <View style={styles.tagsRow}>
          {item.tags.map(tag => (
            <View key={tag} style={styles.tagPill}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Text style={styles.header}>Blog</Text>
      <FlatList
        data={blogData}
        keyExtractor={item => item.id}
        renderItem={renderBlog}
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
    fontSize: 32,
    fontFamily: 'LatoBold',
    color: MyColor.primary,
    alignSelf: 'center',
    paddingTop: 24,
    paddingBottom: 18,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 32,
    paddingHorizontal: 12,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 16,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    resizeMode: 'cover',
    backgroundColor: MyColor.neutral2,
  },
  infoContainer: {
    width: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  authorName: {
    fontFamily: 'LatoBold',
    fontSize: 15,
    color: MyColor.text,
  },
  title: {
    fontFamily: 'LatoBold',
    fontSize: 22,
    color: MyColor.text,
    marginBottom: 8,
    lineHeight: 28,
  },
  summary: {
    fontFamily: 'LatoRegular',
    fontSize: 17,
    color: MyColor.neutral,
    marginBottom: 12,
    lineHeight: 22,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  tagPill: {
    backgroundColor: MyColor.neutral2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontFamily: 'LatoRegular',
    fontSize: 13,
    color: MyColor.primary,
  },
  date: {
    fontFamily: 'LatoRegular',
    fontSize: 14,
    color: MyColor.primary,
    alignSelf: 'flex-end',
  },
});

export default BlogList; 