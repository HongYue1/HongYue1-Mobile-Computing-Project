import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyColor } from '../Utils/MyColors';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const sensorCards = [
  {
    image: require('../assets/moisture.png'),
    label: 'Soil Moisture',
    value: '42%',
    status: 'Normal',
  },
  {
    image: require('../assets/temp.png'),
    label: 'Temperature',
    value: '30°C',
    status: 'Normal',
  },
  {
    image: require('../assets/humidity.png'),
    label: 'Humidity',
    value: '70%',
    status: 'High',
  },
];

const aiResults = [
  {
    imageUrl: require('../assets/AI/Blossom_End_Rot.jpg'),
    result: 'Disease: Blossom End Rot',
    confidence: 92,
  },
  {
    imageUrl: require('../assets/AI/strawberry_ripe.jpg'),
    result: 'Ripe',
    confidence: 97,
  },
];

const statusColors = {
  Normal: { bg: '#e0f7fa', text: '#00796b' },
  High: { bg: '#fffde7', text: '#fbc02d' },
  Low: { bg: '#ffebee', text: '#c62828' },
};

const TABS = ['Field Details', 'Sensor Analytics', 'Alerts'];

const analyticsData = [
  { time: '08:00', moisture: 38, temperature: 26, humidity: 60 },
  { time: '10:00', moisture: 42, temperature: 28, humidity: 65 },
  { time: '12:00', moisture: 45, temperature: 30, humidity: 70 },
  { time: '14:00', moisture: 40, temperature: 31, humidity: 75 },
  { time: '16:00', moisture: 39, temperature: 30, humidity: 72 },
];

const alertData = [
  {
    id: 1,
    type: 'Sensor',
    field: 'West Zone',
    message: 'Soil moisture dropped below 30%',
    severity: 'warning',
    time: '10 mins ago',
  },
  {
    id: 2,
    type: 'AI Detection',
    field: 'North Field',
    message: 'Disease detected: Powdery Mildew',
    severity: 'danger',
    time: '30 mins ago',
  },
  {
    id: 3,
    type: 'Sensor',
    field: 'South Block',
    message: 'Temperature exceeded 35°C',
    severity: 'warning',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'AI Detection',
    field: 'East Side',
    message: 'Crop ripeness reached 95%',
    severity: 'info',
    time: '2 hours ago',
  },
];

const severityStyles = {
  danger: { bg: '#ffebee', text: '#c62828', icon: 'error' },
  warning: { bg: '#fffde7', text: '#fbc02d', icon: 'warning' },
  info: { bg: '#e3f0fd', text: '#1976d2', icon: 'info' },
};

const fields = ['All', 'West Zone', 'North Field', 'South Block', 'East Side'];
const types = ['All', 'Sensor', 'AI Detection'];

function getStats(data, key) {
  const values = data.map((d) => d[key]);
  const sum = values.reduce((a, b) => a + b, 0);
  return {
    avg: (sum / values.length).toFixed(1),
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

const MonitorScreen = () => {
  const [tab, setTab] = useState(0);
  const [filterField, setFilterField] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const filteredAlerts = alertData.filter((a) => {
    const fieldMatch = filterField === 'All' || a.field === filterField;
    const typeMatch = filterType === 'All' || a.type === filterType;
    return fieldMatch && typeMatch;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.tabBar}>
        {TABS.map((t, idx) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === idx && styles.tabActive]}
            onPress={() => setTab(idx)}
            accessibilityRole="button"
            accessibilityState={{ selected: tab === idx }}
          >
            <Text style={[styles.tabText, tab === idx && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {tab === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sensor Readings</Text>
            <View style={styles.sensorGrid}>
              {sensorCards.map((card, idx) => (
                <View key={idx} style={styles.sensorCard}>
                  <Image source={card.image} style={styles.sensorImage} />
                  <Text style={styles.sensorLabel}>{card.label}</Text>
                  <Text style={styles.sensorValue}>{card.value}</Text>
                  <View style={[styles.statusPill, { backgroundColor: statusColors[card.status]?.bg || '#eee' }]}> 
                    <Text style={[styles.statusText, { color: statusColors[card.status]?.text || '#333' }]}>{card.status}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Text style={styles.sectionTitle}>Recent AI Analysis</Text>
            <View style={styles.aiGrid}>
              {aiResults.map((res, idx) => (
                <View key={idx} style={styles.aiCard}>
                  <Image source={res.imageUrl} style={styles.aiImage} />
                  <View style={styles.aiInfo}>
                    <Text style={styles.aiResult}>{res.result}</Text>
                    <Text style={styles.aiConfidence}>Confidence: <Text style={{ color: MyColor.primary, fontWeight: 'bold' }}>{res.confidence}%</Text></Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        {tab === 1 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sensor Analytics</Text>
            <View style={styles.chartCard}>
              <LineChart
                data={{
                  labels: analyticsData.map(d => d.time),
                  datasets: [
                    {
                      data: analyticsData.map(d => d.moisture),
                      color: () => '#10b981',
                      strokeWidth: 2,
                    },
                    {
                      data: analyticsData.map(d => d.temperature),
                      color: () => '#3b82f6',
                      strokeWidth: 2,
                    },
                    {
                      data: analyticsData.map(d => d.humidity),
                      color: () => '#f59e0b',
                      strokeWidth: 2,
                    },
                  ],
                  legend: ['Soil Moisture', 'Temperature', 'Humidity'],
                }}
                width={Dimensions.get('window').width - 48}
                height={220}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(51,51,51,${opacity})`,
                  labelColor: (opacity = 1) => `rgba(51,51,51,${opacity})`,
                  style: { borderRadius: 16 },
                  propsForDots: { r: '4', strokeWidth: '2', stroke: '#fff' },
                  propsForBackgroundLines: { stroke: '#e5e7eb' },
                }}
                bezier
                style={{ borderRadius: 16 }}
              />
            </View>
            <View style={styles.kpiGrid}>
              <View style={[styles.kpiCard, { backgroundColor: '#e0f7fa' }]}> 
                <Text style={styles.kpiTitle}>Soil Moisture</Text>
                <Text style={styles.kpiValue}>Avg: {getStats(analyticsData, 'moisture').avg}%</Text>
                <Text style={styles.kpiSub}>Min: {getStats(analyticsData, 'moisture').min}% | Max: {getStats(analyticsData, 'moisture').max}%</Text>
              </View>
              <View style={[styles.kpiCard, { backgroundColor: '#e3f0fd' }]}> 
                <Text style={styles.kpiTitle}>Temperature</Text>
                <Text style={styles.kpiValue}>Avg: {getStats(analyticsData, 'temperature').avg}°C</Text>
                <Text style={styles.kpiSub}>Min: {getStats(analyticsData, 'temperature').min}°C | Max: {getStats(analyticsData, 'temperature').max}°C</Text>
              </View>
              <View style={[styles.kpiCard, { backgroundColor: '#fff9e6' }]}> 
                <Text style={styles.kpiTitle}>Humidity</Text>
                <Text style={styles.kpiValue}>Avg: {getStats(analyticsData, 'humidity').avg}%</Text>
                <Text style={styles.kpiSub}>Min: {getStats(analyticsData, 'humidity').min}% | Max: {getStats(analyticsData, 'humidity').max}%</Text>
              </View>
            </View>
          </View>
        )}
        {tab === 2 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alerts & Notifications</Text>
            <View style={styles.filterBar}>
              {/* Field Filter */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                {fields.map((f) => (
                  <TouchableOpacity
                    key={f}
                    style={[styles.filterChip, filterField === f && styles.filterChipActive]}
                    onPress={() => setFilterField(f)}
                  >
                    <Text style={[styles.filterChipText, filterField === f && styles.filterChipTextActive]}>{f}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {/* Type Filter */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                {types.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.filterChip, filterType === t && styles.filterChipActive]}
                    onPress={() => setFilterType(t)}
                  >
                    <Text style={[styles.filterChipText, filterType === t && styles.filterChipTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View style={styles.alertList}>
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <View
                    key={alert.id}
                    style={[styles.alertCard, { backgroundColor: severityStyles[alert.severity]?.bg || '#fff' }]}
                  >
                    <View style={styles.alertIconWrap}>
                      <MaterialIcons
                        name={severityStyles[alert.severity]?.icon || 'info'}
                        size={28}
                        color={severityStyles[alert.severity]?.text || MyColor.primary}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.alertHeader}>
                        <Text style={styles.alertMessage}>{alert.message}</Text>
                        <View style={styles.alertFieldPill}>
                          <Text style={styles.alertFieldText}>{alert.field}</Text>
                        </View>
                      </View>
                      <Text style={styles.alertMeta}>Type: {alert.type} · {alert.time}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noAlerts}>0 Notifications & alerts right now</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const CARD_WIDTH = (Dimensions.get('window').width - 48) / 2;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: MyColor.secondary,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: MyColor.neutral2,
    borderRadius: 16,
    margin: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: MyColor.primary,
  },
  tabText: {
    fontFamily: 'LatoRegular',
    fontSize: 16,
    color: MyColor.primary,
  },
  tabTextActive: {
    color: '#fff',
    fontFamily: 'LatoBold',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: 'LatoBold',
    fontSize: 20,
    color: MyColor.primary,
    marginBottom: 12,
    marginTop: 10,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  sensorCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sensorImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  sensorLabel: {
    fontFamily: 'LatoBold',
    fontSize: 15,
    color: MyColor.text,
    marginBottom: 2,
  },
  sensorValue: {
    fontFamily: 'LatoBold',
    fontSize: 20,
    color: MyColor.primary,
    marginBottom: 6,
  },
  statusPill: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 2,
  },
  statusText: {
    fontFamily: 'LatoBold',
    fontSize: 13,
  },
  aiGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  aiCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  aiImage: {
    width: '100%',
    height: 90,
    resizeMode: 'cover',
  },
  aiInfo: {
    padding: 10,
  },
  aiResult: {
    fontFamily: 'LatoBold',
    fontSize: 15,
    color: MyColor.text,
    marginBottom: 2,
  },
  aiConfidence: {
    fontFamily: 'LatoRegular',
    fontSize: 14,
    color: MyColor.neutral,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  kpiCard: {
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  kpiTitle: {
    fontFamily: 'LatoBold',
    fontSize: 15,
    color: MyColor.text,
    marginBottom: 2,
  },
  kpiValue: {
    fontFamily: 'LatoBold',
    fontSize: 18,
    color: MyColor.primary,
    marginBottom: 2,
  },
  kpiSub: {
    fontFamily: 'LatoRegular',
    fontSize: 13,
    color: MyColor.neutral,
  },
  filterBar: {
    marginBottom: 12,
  },
  filterScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  filterChip: {
    backgroundColor: MyColor.neutral2,
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 4,
  },
  filterChipActive: {
    backgroundColor: MyColor.primary,
  },
  filterChipText: {
    fontFamily: 'LatoRegular',
    fontSize: 15,
    color: MyColor.primary,
  },
  filterChipTextActive: {
    color: '#fff',
    fontFamily: 'LatoBold',
  },
  alertList: {
    marginTop: 8,
    gap: 10,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 16,
    padding: 14,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  alertIconWrap: {
    marginRight: 12,
    marginTop: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    justifyContent: 'space-between',
  },
  alertMessage: {
    fontFamily: 'LatoBold',
    fontSize: 15,
    color: MyColor.text,
    flex: 1,
    marginRight: 8,
  },
  alertFieldPill: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
  },
  alertFieldText: {
    fontFamily: 'LatoBold',
    fontSize: 12,
    color: MyColor.primary,
  },
  alertMeta: {
    fontFamily: 'LatoRegular',
    fontSize: 13,
    color: MyColor.neutral,
  },
  noAlerts: {
    fontFamily: 'LatoRegular',
    fontSize: 15,
    color: MyColor.neutral,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default MonitorScreen; 