import tensorflow as tf

# Load your original trained model
model = tf.keras.models.load_model("multiclass_model_aug_3_lang.keras")

# Save it in TensorFlow.js-compatible Keras format
model.save("clean_model.keras")

print("✅ Clean model saved successfully!")
