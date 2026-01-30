import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const ITEMS = [
  {
    id: "1",
    barcode: "5900541012218",
    name: "Woda Żywiec Zdrój 1.5L",
    addedDate: "2026-01-10",
    expDate: "2026-06-12",
    quantity: 6,
    status: "success",
  },
  {
    id: "2",
    name: "Ser żółty",
    addedDate: "2026-01-05",
    expDate: "2026-01-12",
    quantity: 2,
    status: "warning",
  },
  {
    id: "3",
    name: "Jogurt",
    addedDate: "2026-01-08",
    expDate: "2026-01-15",
    quantity: 1,
    status: "success",
  },
  {
    id: "4",
    name: "Mleko",
    addedDate: "2026-01-20",
    expDate: "2026-02-05",
    quantity: 3,
    status: "success",
  },
  {
    id: "5",
    name: "Masło",
    addedDate: "2026-01-15",
    expDate: "2026-02-01",
    quantity: 1,
    status: "warning",
  },
  {
    id: "6",
    name: "Jajka",
    addedDate: "2026-01-01",
    expDate: "2026-01-30",
    quantity: 2,
    status: "danger",
  },
].sort((a, b) => a.expDate.localeCompare(b.expDate));

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  const months = [
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paź",
    "Lis",
    "Gru",
  ];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const renderItem = ({ item }: { item: (typeof ITEMS)[0] }) => (
    <View style={[styles.card, { borderColor: "#eee" }]}>
      <View style={styles.cardLeft}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: theme[item.status as "success" | "warning"] },
          ]}
        />
        <View>
          <ThemedText
            type="defaultSemiBold"
            style={{ color: theme.text, fontSize: 16 }}
          >
            {item.name}
          </ThemedText>
          <ThemedText style={{ color: "#888", fontSize: 12, marginTop: 2 }}>
            {formatDate(item.expDate)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.qtyButton}>
          <ThemedText style={styles.qtyButtonText}>-</ThemedText>
        </TouchableOpacity>
        <ThemedText style={styles.qtyText}>{item.quantity}</ThemedText>
        <TouchableOpacity style={styles.qtyButton}>
          <ThemedText style={styles.qtyButtonText}>+</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <ThemedText
          type="title"
          style={{ color: theme.text, marginBottom: 16 }}
        >
          ZAPASIO
        </ThemedText>
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#999" />
          <TextInput
            placeholder="Szukaj"
            placeholderTextColor="#999"
            style={[styles.searchInput, { color: theme.text }]}
          />
        </View>
      </View>

      <FlatList
        data={ITEMS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={[styles.footer, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          style={[styles.scanButton, { backgroundColor: theme.primary }]}
        >
          <IconSymbol name="viewfinder" size={24} color="#fff" />
          <ThemedText style={styles.scanButtonText}>SKANUJ / DODAJ</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 80,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  qtyButtonText: {
    fontSize: 18,
    color: "#666",
    lineHeight: 20,
    marginTop: -2,
  },
  qtyText: {
    width: 32,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    elevation: 10,
    backgroundColor: "#fff",
  },
  scanButton: {
    flexDirection: "row",
    height: 54,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E67E22",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    textTransform: "uppercase",
  },
});
