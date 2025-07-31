# detect_anomalies.py
import pandas as pd

def detect_anomalies(df):
    anomalies = df[
        df['defect'].notna() &
        (df['defect'].str.lower() != 'none') &
        (df['defect'].str.strip() != '')
    ]

    grouped = anomalies.groupby(['defect', 'machine', 'shift'])
    summary = []

    for (defect, machine, shift), group in grouped:
        count = len(group)
        percentage = (count / len(df)) * 100
        message = f"{defect.capitalize()} observed in {count} parts ({percentage:.1f}%) from {machine} during Shift {shift}."
        summary.append({
            "defect": defect,
            "machine": machine,
            "shift": shift,
            "message": message
        })

    return summary

# Optional: keep this for CLI testing
if __name__ == '__main__':
    df = pd.read_csv("synthetic_manufacturing_data.csv")
    result = detect_anomalies(df)
    import json
    print(json.dumps(result, indent=2))
