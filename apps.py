from tensorflow.keras.models import load_model

# Load original model WITHOUT compiling
model = load_model("multiclass_model_aug_3_lang.keras", compile=False)

# Save a clean version
model.save("clean_model.keras", include_optimizer=False)
