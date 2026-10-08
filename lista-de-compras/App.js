import { useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // Um estado guarda o texto digitado e o outro guarda a lista de compras.
  const [novoItem, setNovoItem] = useState('');
  const [itens, setItens] = useState([]);

  function adicionarItem() {
    const nome = novoItem.trim();

    // Evita adicionar um item vazio ou composto apenas por espaços.
    if (nome === '') {
      return;
    }

    // Cria um novo array, mantendo os itens anteriores, sem usar push().
    setItens((listaAtual) => [
      ...listaAtual,
      { id: String(listaAtual.length + 1), nome: nome },
    ]);

    setNovoItem('');
    Keyboard.dismiss();
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.tela}>
        <StatusBar style="dark" />

        <View style={styles.conteudo}>
          <Text style={styles.titulo}>Lista de compras</Text>
          <Text style={styles.subtitulo}>Anote o que você precisa comprar.</Text>

          <Text style={styles.label}>Novo item</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Arroz"
            placeholderTextColor="#64748b"
            accessibilityLabel="Novo item"
            value={novoItem}
            onChangeText={setNovoItem}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={adicionarItem}
            accessibilityRole="button"
            accessibilityLabel="Adicionar"
          >
            <Text style={styles.textoBotao}>Adicionar</Text>
          </TouchableOpacity>

          <Text style={styles.tituloLista}>Itens da lista ({itens.length})</Text>

          {/* A FlatList recebe o array e renderiza cada item na tela. */}
          <FlatList
            style={styles.lista}
            data={itens}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.nomeItem}>{item.nome}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.listaVazia}>Sua lista está vazia.</Text>
            }
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#f3f5f8',
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#253b59',
  },
  subtitulo: {
    fontSize: 15,
    color: '#526075',
    marginTop: 8,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#253b59',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#a8b4c4',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#253b59',
  },
  botao: {
    backgroundColor: '#254b78',
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tituloLista: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#253b59',
    marginTop: 30,
    marginBottom: 14,
  },
  lista: {
    flex: 1,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d8dee7',
    marginBottom: 10,
  },
  nomeItem: {
    fontSize: 17,
    color: '#253b59',
  },
  listaVazia: {
    color: '#64748b',
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 28,
  },
});
