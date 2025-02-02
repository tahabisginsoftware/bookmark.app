// src/components/EditBookModal.js
import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';

const ModalAnimation = ({children, visible}) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animation, {
      toValue: visible ? 1 : 0,
      tension: 30,
      friction: 7,
      useNativeDriver: true
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1]
            })
          }
        ],
        opacity: animation
      }}
    >
      {children}
    </Animated.View>
  );
};

const EditBookModal = ({ visible, book, onClose, onUpdate, onArchive }) => {
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setTargetDate(book.targetDate || '');
    }
  }, [book]);

  const handleUpdate = () => {
    if (!book) return;
    
    onUpdate(book.id, {
      ...book,
      title,
      targetDate,
    });
    onClose();
  };

  if (!book || !visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <ModalAnimation visible={visible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Book</Text>
            
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Book Title"
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.input}
              value={targetDate}
              onChangeText={setTargetDate}
              placeholder="Target Date (DD.MM.YYYY)"
              placeholderTextColor="#999"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.archiveButton]} 
                onPress={() => {
                  onArchive(book.id);
                  onClose();
                }}
              >
                <Text style={styles.buttonText}>Archive</Text>
              </TouchableOpacity>
              <View style={styles.rightButtons}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]} 
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.updateButton]} 
                  onPress={handleUpdate}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ModalAnimation>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  archiveButton: {
    backgroundColor: '#666',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  updateButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontFamily: 'DMMono',
    color: 'white',
  },
});

export default EditBookModal;