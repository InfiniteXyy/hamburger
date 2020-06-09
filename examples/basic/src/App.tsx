import hamburger, { Text, VStack } from '@hamburger/core';
import SampleReactive from './components/useReactive';
import SampleDSL from './components/useDSL';
import SampleJSX from './components/useJSX';
import SampleLayout from './components/useLayout';

function Section(title: string, component) {
  return VStack(Text(title).fontSize(24).bold().opacity(0.5), component())
    .border({ width: 2, color: '#eaeaea' })
    .margin(10)
    .padding(10);
}

function App() {
  return VStack(
    VStack(
      Text('Hamburger').color('skyblue').bold().fontSize(50),
      Section('Sample Reactive', SampleReactive),
      Section('Sample DSL', SampleDSL),
      Section('Sample JSX', SampleJSX),
      Section('Sample Layout', SampleLayout)
    )
  )
    .padding(20)
    .size({ width: 700 });
}

export default App;
