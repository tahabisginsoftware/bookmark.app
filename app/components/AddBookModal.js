// src/components/AddBookModal.js
import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ModalAnimation = ({children, visible}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [visible]);

  return (
    <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
      {children}
    </Animated.View>
  );
};

const AddBookModal = ({ visible, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAdd = () => {
    if (!title || !totalPages || !currentPage) return;
    
    onAdd({
      id: Date.now().toString(),
      title,
      totalPages: parseInt(totalPages),
      currentPage: parseInt(currentPage),
      targetDate,
      archived: false,
    });

    setTitle('');
    setTotalPages('');
    setCurrentPage('');
    setTargetDate('');
    onClose();
  };

  const handleConfirm = (date) => {
    setTargetDate(date.toLocaleDateString());
    setShowDatePicker(false);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <ModalAnimation visible={visible}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Book</Text>
              <TextInput
                style={styles.input}
                placeholder="Book Title"
                placeholderTextColor="#999"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Total Pages"
                placeholderTextColor="#999"
                value={totalPages}
                onChangeText={setTotalPages}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Current Page"
                placeholderTextColor="#999"
                value={currentPage}
                onChangeText={setCurrentPage}
                keyboardType="numeric"
              />
              <TouchableOpacity 
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {targetDate || "Select Target Date"}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setShowDatePicker(false)}
                minimumDate={new Date()}
                buttonTextColorIOS="#007AFF"
                textColor="#fff"
                isDarkModeEnabled={true}
                pickerStyleIOS={{
                    alignItems: 'center',
                }}
                pickerContainerStyleIOS={{
                    borderRadius: 8,
                    width: '100%'
                }}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.addButton]} 
                  onPress={handleAdd}
                >
                  <Text style={styles.buttonText}>Add Book</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ModalAnimation>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    width: 370
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    margin: 20,
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    fontFamily: 'DMMono',
    fontSize: 20,
    color: 'white',
    marginBottom: 16,
  },
  input: {
    fontFamily: 'DMMono',
    backgroundColor: '#404040',
    padding: 12,
    borderRadius: 4,
    color: 'white',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontFamily: 'DMMono',
    color: 'white',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddBookModal;