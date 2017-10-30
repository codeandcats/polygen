import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../shared/models/applicationState';
import { ProjectFile } from '../../../shared/models/projectFile';
import { openNewProjectFile } from '../../actions/editor/openNewProjectFile';
import { hideNewProjectFileDialog } from '../../actions/hideNewProjectFileDialog';
import { Store } from '../../reduxWithLessSux/store';
import { BootstrapLabel } from './breakpointLabel/index';
import { EditorView } from './editorView';
import { NewProjectFileDialog } from './newProjectFileDialog/index';
import './styles';
import { WelcomeView } from './welcomeView';

interface MainWindowProps {
	store: Store<ApplicationState>;
	onOpenProjectFile: (fileName: string) => void;
	onShowOpenProjectFileDialog: () => void;
	onShowNewProjectFileDialog: () => void;
}

interface MainWindowState {
}

export class MainWindow extends React.Component<MainWindowProps, MainWindowState> {
	constructor() {
		super();
	}

	public render() {
		const state = this.props.store.getState();

		return (
			<div>
				<NewProjectFileDialog
					isVisible={ state.dialogs.newProjectFile.isVisible }
					defaultDimensions={ state.dialogs.newProjectFile.dimensions }
					onAccept={ dimensions => openNewProjectFile(this.props.store, { dimensions }) }
					onCancel={ () => hideNewProjectFileDialog(this.props.store) }
				/>

				{
					state.editors.length === 0 ?
					<WelcomeView
						recentFileNames={ state.recentFileNames }
						onOpenProjectFile={ fileName => this.props.onOpenProjectFile(fileName) }
						onShowNewProjectFileDialog={ () => this.props.onShowNewProjectFileDialog() }
						onShowOpenProjectFileDialog={ () => this.props.onShowOpenProjectFileDialog() }
					/> :
					<EditorView store={this.props.store} />
				}
				<BootstrapLabel />
			</div>
		);
	}
}
