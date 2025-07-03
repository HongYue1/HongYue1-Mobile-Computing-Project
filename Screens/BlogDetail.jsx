import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyColor } from '../Utils/MyColors';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const BlogDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { blog } = route.params || {};

  if (!blog) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <Text style={styles.header}>Blog Article</Text>
        <Text style={styles.error}>Blog not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image source={blog.image} style={styles.image} accessibilityLabel={blog.title} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons name="chevron-back" size={28} color={MyColor.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.rowBetween}>
            <View style={styles.authorRow}>
              <Image source={blog.author.avatar} style={styles.avatar} accessibilityLabel={blog.author.name} />
              <Text style={styles.authorName}>{blog.author.name}</Text>
            </View>
            <Text style={styles.date}>{new Date(blog.date).toLocaleDateString()}</Text>
          </View>
          <Text style={styles.title}>{blog.title}</Text>
          <View style={styles.tagsRow}>
            {blog.tags.map(tag => (
              <View key={tag} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.content}>{blog.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MyColor.secondary,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 240,
    backgroundColor: MyColor.neutral2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  backButton: {
    position: 'absolute',
    top: 18,
    left: 18,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  authorName: {
    fontFamily: 'LatoBold',
    fontSize: 16,
    color: MyColor.text,
  },
  title: {
    fontFamily: 'LatoBold',
    fontSize: 26,
    color: MyColor.primary,
    marginBottom: 10,
    lineHeight: 32,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tagPill: {
    backgroundColor: MyColor.neutral2,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontFamily: 'LatoRegular',
    fontSize: 14,
    color: MyColor.primary,
  },
  date: {
    fontFamily: 'LatoRegular',
    fontSize: 15,
    color: MyColor.neutral,
    alignSelf: 'flex-end',
  },
  content: {
    fontFamily: 'LatoRegular',
    fontSize: 17,
    color: MyColor.text,
    lineHeight: 26,
    marginTop: 10,
  },
  error: {
    color: MyColor.error,
    fontFamily: 'LatoBold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default BlogDetail; 