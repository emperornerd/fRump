import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Built into Expo

const allNicknames = [
  "Tangerine Palpatine", "Cheeto Benito", "Mango Mussolini", "Hair Furor",
  "Dorito Don", "Orange Julius Caesar", "Commander-in-Cheat", "Agent Orange",
  "The Combover Kid", "Donald Drumpf", "Trumplethinskin", "The Human Dorito",
  "The Apricot Asshole", "Il Douche", "The Orange One", "King Cheeto",
  "The Great Pumpkin", "The Orange Menace", "Sunkist Stalin", "The Mango Menace",
  "Velveeta Voldemort", "The Tantrum Toddler", "The Orange Oaf", "The Tangerine Tyrant",
  "The Carrot Caligula", "The Cantaloupe Chaos", "Dictator Tot", "The Trumpet of Doom",
  "Cheez Whiz Kaiser", "The Mandarin Menace", "Orange is the New Hack",
  "The Gilded Garbage Fire", "Yam Yam Bigelow", "The Butternut Bigot", "The Cheeto Czar",
  "The Faux-bama Slayer", "The Bouffant Buffoon", "The Tang Tyrant", "The Big Mac Mussolini",
  "Trumpelstiltskin", "Cantaloupe Khrushchev", "The Spray-Tan Satan", "Grifty McGriftface",
  "Fanta Fascist", "The Inflatable Autocrat", "The Golden Toad", "Tangelo Goebbels",
  "The Peroxide Pol Pot", "Covfefe Caligula", "The Tangerine Nightmare", "The Orange Obstruction",
  "The Oompa Loompa Overlord", "Tucker Carlson’s Idol", "The Sham-Wow Salesman-in-Chief",
  "Twitter Tyrant", "The Troll-in-Chief", "The Nasty Narcissist", "The Ego Yam",
  "Dictator Cheetolini", "The Crispy Cruller King", "Sith Lord Sunkist", "The Orange McCarthy",
  "Generalissimo Trumpissimo", "Tangerine Ballbag", "Apricot Anxiety Machine", "Sunkissed Screamer",
  "The Vitamixed Voldemort", "The Sunburned Stalin", "Donny Rotten", "The Peach Putschist",
  "The Golden Combover", "The Bronze Bolshevik", "Orange Nebuchadnezzar", "The Nuclear Narcissist",
  "The Tangy Traitor", "Marmalade Madman", "Coconut Cream Führer", "Crayola Caligula",
  "The Orange Supremacist", "The Citrus Symptom", "Don the Con", "The Lie Emperor",
  "Pumpkin Putin Puppet", "The Creamsicle Commander", "Dictorange", "Spraytan Pol Pot",
  "The Borscht Buffoon", "The Butterscotch Buffoon", "The Rotten Yam", "Scammy Davis Jr.",
  "The Tangerine Torquemada", "The Creamsicle Clown", "Napoleon Blownapart",
  "The Mussolini of Mar-a-Lago", "Cinnabon Caligula", "The Lipstick Autocrat",
  "The Narcissorange", "Gourd of the Deal", "Generalissimo Gropenfuhrer",
  "The Grand Cheetolini", "Whiny the Pooh", "Führer of Flavortown", "The Tantrump",
  "King Baby Hands"
];

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [remaining, setRemaining] = useState([...allNicknames]);
  const [current, setCurrent] = useState("Tap the button to reveal a nickname");
  const [favorites, setFavorites] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const showNextNickname = () => {
    if (remaining.length === 0) {
      setRemaining([...allNicknames]);
      setCurrent("🎉 All names shown! Reshuffling...");
      animate();
      return;
    }

    const index = Math.floor(Math.random() * remaining.length);
    const name = remaining[index];
    const updated = remaining.filter((_, i) => i !== index);

    setCurrent(name);
    setRemaining(updated);
    animate();
  };

  const animate = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true
      })
    ]).start();
  };

  const toggleFavorite = () => {
    if (favorites.includes(current)) {
      setFavorites(favorites.filter(n => n !== current));
    } else if (allNicknames.includes(current)) {
      setFavorites([...favorites, current]);
    }
  };

  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>He Who Shall Not Be Named</Text>

      <Animated.Text
        style={[
          styles.nickname,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
        ]}
      >
        {current}
      </Animated.Text>

      {allNicknames.includes(current) && (
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={favorites.includes(current) ? 'star' : 'star-outline'}
            size={32}
            color={favorites.includes(current) ? '#facc15' : styles.favoriteIcon.color}
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={showNextNickname}>
        <Text style={styles.buttonText}>Reveal Another Name</Text>
      </TouchableOpacity>

      {favorites.length > 0 && (
        <View style={styles.favoritesContainer}>
          <Text style={styles.favHeader}>⭐ Favorites:</Text>
          <FlatList
            data={favorites}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <Text style={styles.favItem}>• {item}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
}

const getStyles = isDark => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? '#111' : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: isDark ? '#eee' : '#222'
  },
  nickname: {
    fontSize: 22,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: isDark ? '#ffb347' : '#cc5500',
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: isDark ? '#ff7700' : '#ff6600',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  favoriteButton: {
    marginBottom: 10
  },
  favoriteIcon: {
    color: isDark ? '#aaa' : '#333'
  },
  favoritesContainer: {
    marginTop: 30,
    width: '100%',
    maxHeight: 150,
    borderTopWidth: 1,
    borderColor: isDark ? '#333' : '#ccc',
    paddingTop: 10
  },
  favHeader: {
    fontWeight: 'bold',
    color: isDark ? '#fff' : '#000',
    marginBottom: 5
  },
  favItem: {
    color: isDark ? '#ddd' : '#333',
    fontSize: 16,
    marginBottom: 2
  }
});
