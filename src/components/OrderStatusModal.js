import { View, StyleSheet, Modal, Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import api from "../utils/Api";
import { blue50 } from "../utils/Constants";

const OrderStatusModal = ({
  modalOpen,
  setModalOpen,
  _id,
  setRefresh,
  refresh,
}) => {
  const token = useSelector((state) => state.user.token);
  const cancelOrder = async () => {
    const result = await api("order/admin/status/update", "post", {
      token: token,
      _id: _id,
      status: "cancelled",
    });

    setRefresh(!refresh);
    setModalOpen(false);
  };

  const completeOrder = async () => {
    const result = await api("order/admin/status/update", "post", {
      token: token,
      _id: _id,
      status: "completed",
    });
    setRefresh(!refresh);
    setModalOpen(false);
  };

  return (
    <Modal visible={modalOpen} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.buttons} onPress={cancelOrder}>
            <Text style={[styles.text, { color: "#D3212C" }]}>
              Mark as cancel
            </Text>
          </Pressable>

          <Pressable style={styles.buttons} onPress={completeOrder}>
            <Text style={[styles.text, { color: "#069C56" }]}>
              Mark as complete
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setModalOpen(false);
            }}
            style={styles.cancel}
          >
            <Text numberOfLines={1} style={styles.text}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: blue50,
    height: "28%",
    marginTop: "auto",
    alignItems: "flex-end",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "#ffffff",
    margin: 1,
    width: "95%",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 15,
  },
  cancel: {
    alignItems: "center",
    width: "95%",
    backgroundColor: "#ffffff",
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 15,
    paddingVertical: 15,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderStatusModal;
