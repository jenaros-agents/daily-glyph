#!/usr/bin/env python3
"""
Gather daily seeds for the glyph agent.
Writes a JSON bundle to archive/seed-bundle-YYYY-MM-DD.json.
"""
import json
import math
import random
from datetime import datetime, timezone
from pathlib import Path
import urllib.request
import urllib.error

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "archive"

CURATED_PALETTES = [
    ["#1a1a2e", "#16213e", "#0f3460", "#e94560"],
    ["#2b2d42", "#8d99ae", "#edf2f4", "#ef233c"],
    ["#264653", "#2a9d8f", "#e9c46a", "#f4a261"],
    ["#606c38", "#283618", "#fefae0", "#dda15e"],
    ["#3d405b", "#81b29a", "#f2cc8f", "#e07a5f"],
    ["#03071e", "#370617", "#6a040f", "#9d0208"],
    ["#10002b", "#240046", "#3c096c", "#7b2cbf"],
    ["#000000", "#14213d", "#fca311", "#e5e5e5"],
    ["#5f0f40", "#9a031e", "#fb8b24", "#e36414"],
    ["#0d1b2a", "#1b263b", "#415a77", "#778da9"],
]

NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

def random_point():
    lat = random.uniform(-90, 90)
    lon = random.uniform(-180, 180)
    return {"lat": round(lat, 4), "lon": round(lon, 4)}

def moon_illumination(date: datetime) -> float:
    # Known new moon: 2000-01-06 18:14 UTC
    new_moon = datetime(2000, 1, 6, 18, 14, tzinfo=timezone.utc)
    diff = date - new_moon
    days = diff.total_seconds() / 86400
    synodic = 29.53059
    age = days % synodic
    illumination = (1 - math.cos(2 * math.pi * age / synodic)) / 2
    return round(illumination, 4)

def moon_phase_name(illumination: float) -> str:
    if illumination < 0.05:
        return "new moon"
    if illumination < 0.45:
        return "waxing crescent"
    if illumination < 0.55:
        return "first quarter"
    if illumination < 0.95:
        return "waxing gibbous"
    return "full moon"

def day_of_year(date: datetime) -> int:
    return date.timetuple().tm_yday

def daylight_ratio(date: datetime, lat: float) -> float:
    # Simplified daylight fraction based on declination and latitude.
    day = day_of_year(date)
    declination = -23.45 * math.cos(math.radians((360 / 365) * (day + 10)))
    lat_rad = math.radians(lat)
    dec_rad = math.radians(declination)
    hour_angle = math.acos(max(-1, min(1, -math.tan(lat_rad) * math.tan(dec_rad))))
    daylight_hours = math.degrees(hour_angle) / 15 * 2
    return round(min(max(daylight_hours / 24, 0), 1), 4)

def fetch_weather(lat: float, lon: float) -> dict:
    try:
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,weather_code&timezone=auto"
        with urllib.request.urlopen(url, timeout=15) as r:
            data = json.load(r)
        return {
            "temperature_c": data.get("current", {}).get("temperature_2m"),
            "weather_code": data.get("current", {}).get("weather_code"),
            "source": "open-meteo",
        }
    except Exception as e:
        return {"error": str(e)}

def random_constant_digit():
    constants = {
        "pi": "3.14159265358979323846264338327950288419716939937510",
        "e": "2.71828182845904523536028747135266249775724709369995",
        "phi": "1.61803398874989484820458683436563811772030917980576",
    }
    name = random.choice(list(constants.keys()))
    digits = constants[name].replace(".", "")
    idx = random.randint(0, len(digits) - 1)
    return {"constant": name, "digit": int(digits[idx]), "index": idx}

def random_note():
    octave = random.randint(2, 5)
    note = random.choice(NOTE_NAMES)
    semitone = NOTE_NAMES.index(note)
    midi = 12 * (octave + 1) + semitone
    freq = round(440 * (2 ** ((midi - 69) / 12)), 2)
    return {"note": f"{note}{octave}", "frequency_hz": freq}

def random_element():
    elements = [
        {"symbol": "H", "number": 1, "shells": [1]},
        {"symbol": "He", "number": 2, "shells": [2]},
        {"symbol": "Li", "number": 3, "shells": [2, 1]},
        {"symbol": "C", "number": 6, "shells": [2, 4]},
        {"symbol": "O", "number": 8, "shells": [2, 6]},
        {"symbol": "Ne", "number": 10, "shells": [2, 8]},
        {"symbol": "Fe", "number": 26, "shells": [2, 8, 14, 2]},
        {"symbol": "Au", "number": 79, "shells": [2, 8, 18, 32, 18, 1]},
    ]
    return random.choice(elements)

def random_event_keyword():
    # A tiny, curated set of abstractable historical keywords.
    words = [
        "flight", "bridge", "signal", "storm", "letter", "orbit", "crystal",
        "voyage", "equation", "harvest", "ember", "tide", "mirror", "compass",
        "silence", "current", "ascent", "thread", "horizon", "pulse",
    ]
    return random.choice(words)

def random_crystal():
    crystals = ["cubic", "hexagonal", "monoclinic", "triclinic", "orthorhombic"]
    return random.choice(crystals)

def random_star():
    letters = "αβγδεζηθικλμνξοπρστυφχψω"
    return {
        "name": f"{random.choice(letters)} {random.choice(['Lyrae', 'Cassiopeiae', 'Orionis', 'Cygni', 'Aquarii', 'Draconis'])}",
        "ra_hours": round(random.uniform(0, 24), 4),
        "dec_degrees": round(random.uniform(-90, 90), 4),
        "magnitude": round(random.uniform(0, 6), 2),
    }

def build_bundle() -> dict:
    now = datetime.now(timezone.utc)
    date_str = now.strftime("%Y-%m-%d")
    point = random_point()
    illum = moon_illumination(now)
    weather = fetch_weather(point["lat"], point["lon"])

    return {
        "date": date_str,
        "timestamp_utc": now.isoformat(),
        "day_of_year": day_of_year(now),
        "seeds": {
            "moon": {
                "illumination": illum,
                "phase": moon_phase_name(illum),
            },
            "random_point": point,
            "weather": weather,
            "palette": random.choice(CURATED_PALETTES),
            "constant_digit": random_constant_digit(),
            "note": random_note(),
            "element": random_element(),
            "event_keyword": random_event_keyword(),
            "crystal": random_crystal(),
            "star": random_star(),
        },
        "selection_pool": [
            "moon",
            "random_point",
            "weather",
            "palette",
            "constant_digit",
            "note",
            "element",
            "event_keyword",
            "crystal",
            "star",
        ],
    }

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    bundle = build_bundle()
    out_path = OUT_DIR / f"seed-bundle-{bundle['date']}.json"
    with open(out_path, "w") as f:
        json.dump(bundle, f, indent=2)
    print(out_path)

if __name__ == "__main__":
    main()
