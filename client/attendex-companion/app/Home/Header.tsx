import { useState, useEffect, type ReactNode, type FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Portal,
  Dialog,
  Button,
  Paragraph,
  Card,
  Chip,
} from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { signOut } from "../../Utils/Auth";
import { useNavigation } from "@react-navigation/native";

interface TooltipProps {
  children: ReactNode;
  tooltipText: ReactNode;
}
const Tooltip: FC<TooltipProps> = ({ children, tooltipText }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <View>
      <TouchableOpacity onPress={showTooltip} activeOpacity={0.9}>
        {children}
      </TouchableOpacity>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideTooltip}
          style={{ width: "auto", height: 400, backgroundColor: "black" }}
        >
          <Dialog.Content>
            <Paragraph>{tooltipText}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions style={{ marginTop: 230 }}>
            <Button onPress={hideTooltip}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const getStatusChip = (status: string) => {
  switch (status) {
    case "Recorded":
      return (
        <Chip
          style={styles.chip}
          icon="check-circle-outline"
          mode="outlined"
          selectedColor="#28a745"
        >
          Attendance Recorded
        </Chip>
      );
    case "Closing-Soon":
      return (
        <Chip
          style={styles.chip}
          icon="alert-circle-outline"
          mode="outlined"
          selectedColor="#ffc107"
        >
          Window Closing Soon
        </Chip>
      );
    case "Closed":
      return (
        <View style={styles.chipContainer}>
          <Chip
            style={styles.chip}
            icon="close-circle-outline"
            mode="outlined"
            selectedColor="#dc3545"
          >
            Window Closed
          </Chip>
        </View>
      );
    default:
      return (
        <Chip
          style={styles.chip}
          icon="sync"
          mode="outlined"
          selectedColor="#17a2b8"
        >
          Attendance not recorded
        </Chip>
      );
  }
};

const TooltipContent = () => (
  <View style={styles.tooltipContent}>
    <View style={styles.tooltipIndiContent}>
      {getStatusChip("Recorded")}
      <Text style={styles.tooltipText}>Attendance window is open</Text>
    </View>
    <View style={styles.tooltipIndiContent}>
      {getStatusChip("Closing-Soon")}
      <Text style={styles.tooltipText}>
        Attendance recording window closing in 30 mins
      </Text>
    </View>
    <View style={styles.tooltipIndiContent}>
      {getStatusChip("Closed")}
      <Text style={styles.tooltipText}>
        Attendance recording window has closed
      </Text>
    </View>
    <View style={styles.tooltipIndiContent}>
      {getStatusChip("")}
      <Text style={styles.tooltipText}>Attendance not recorded</Text>
    </View>
  </View>
);

const NFCHeader = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [date] = useState(new Date().toDateString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <View style={styles.dateTimeContainer}>
            <Icon name="calendar" size={20} color="#000" />
            <Text style={styles.dateText}>{date}</Text>
            <Icon name="clockcircleo" size={20} color="#000" />
            <Text style={styles.timeText}>{time}</Text>
            <View style={styles.logoutContainer}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  signOut(navigation);
                }}
              >
                <Icon name="logout" size={20} color="#000" />
                <Text style={styles.timeText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Attendance Status:</Text>
            <Tooltip tooltipText={<TooltipContent />}>
              {getStatusChip("")}
            </Tooltip>
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    zIndex: 30,
  },
  header: {
    backgroundColor: "#fff",
    height: 40,
    marginHorizontal: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardContainer: {
    marginTop: 10,
    marginHorizontal: 5,
    zIndex: 30,
  },
  card: {
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: "#f8f3f9",
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: 5,
    marginRight: 15,
    fontSize: 16,
    fontWeight: "600",
  },
  timeText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  logoutContainer: {
    position: "relative",
    right: -32,
  },
  logoutButton: {
    backgroundColor: "#42A5F5",
    borderRadius: 30,
    padding: 7,
    display: "flex",
    flexDirection: "row",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  statusText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  tooltipContent: {
    padding: 10,
    flexDirection: "column",
  },
  tooltipText: {
    marginBottom: 5,
    fontWeight: "500",
    color: "#fff",
  },
  tooltipIndiContent: {
    display: "flex",
    flex: 1,
    position: "relative",
    top: 250,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  chip: {
    marginVertical: 5,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  chipContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  dialog: {
    maxWidth: "80%",
    alignSelf: "center",
    backgroundColor: "white",
  },
});

export default NFCHeader;
