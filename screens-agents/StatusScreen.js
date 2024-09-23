import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';

const rowsPerPage = 16; // Number of rows per page

export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['No', 'Date', '0.35ml Qty', '0.6ml Qty', '1L Qty', '2L Qty', '0.35ml UP', '0.6mlUP', '1LUP', '2LUP', '0.35ml Val', '0.6ml Val', '1L Val', '2L Val', 'TotalQ', 'Total Val', 'Status'],
      widthArr: [90, 90, 80, 80, 60, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 10],
      currentPage: 0, // Current page
    };
  }

  // Replace this with your actual data
  generateData() {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const dataRow = [];
      for (let j = 0; j < 17; j++) {
        dataRow.push(`${i}${j}`);
      }
      data.push(dataRow);
    }
    return data;
  }

  // Calculate the number of pages
  totalPages = () => Math.ceil(this.generateData().length / rowsPerPage);

  // Update the current page
  changePage = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const state = this.state;

    // Slice the data based on the current page
    const data = this.generateData();
    const dataSlice = data.slice(
      state.currentPage * rowsPerPage,
      (state.currentPage + 1) * rowsPerPage
    );

    return (
      <View style={styles.container}>
    <ScrollView horizontal={true} style={{ width: 770 }}>
  <View>
    <Table borderStyle={{ borderColor: '#C1C0B9' }}>
      <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text} />
    </Table>
    <ScrollView style={styles.dataWrapper}>
      <Table borderStyle={{ borderColor: '#C1C0B9' }}>
        {dataSlice.map((dataRow, index) => (
          <Row
            key={index}
            data={dataRow}
            widthArr={state.widthArr}
            style={[styles.row, index % 1 && { backgroundColor: '#ffffff' }]}
            textStyle={styles.text}
          />
        ))}
      </Table>
    </ScrollView>
  </View>
</ScrollView>
         
        {/* Pagination controls */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            onPress={() => this.changePage(state.currentPage - 1)}
            disabled={state.currentPage === 0}
          >
            <Text style={styles.paginationButton}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageText}>
            Page {state.currentPage + 1} of {this.totalPages()}
          </Text>
          <TouchableOpacity
            onPress={() => this.changePage(state.currentPage + 1)}
            disabled={state.currentPage === this.totalPages() - 1}
          >
            <Text style={styles.paginationButton}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  head: {
    height: 50,
    backgroundColor: '#87CEEB',
  },
  text: {
    textAlign: 'center',
    fontWeight: '200',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#F7F8FA',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#87CEEB',
    color: 'white',
    borderRadius: 5,
  },
  pageText: {
    margin: 5,
    fontSize: 16,
  },
});
