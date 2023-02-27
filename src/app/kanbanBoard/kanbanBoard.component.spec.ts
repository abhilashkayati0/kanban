import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {KanbanBoard} from './kanbanBoard.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('KanbanBoard', () => {
  // elements in App by data-testids
  const testIds = {
    moveBackButton: 'move-back-button',
    moveForwardButton: 'move-forward-button',
    stages: ['stage-0', 'stage-1', 'stage-2', 'stage-3'],
  };

  const getByTestId = (testId: string, compiled) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        declarations: [KanbanBoard],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  }));

  const factory = () => {
    const fixture: ComponentFixture<KanbanBoard> = TestBed.createComponent(KanbanBoard);
    const component: KanbanBoard = fixture.componentInstance;
    const tasks = [
      { name: 'task 1', stage: 0 },
      { name: 'task 2', stage: 0 },
      { name: 'task 3', stage: 0 },
      { name: 'task 4', stage: 1 },
      { name: 'task 5', stage: 1 },
      { name: 'task 6', stage: 1 },
      { name: 'task 7', stage: 2 },
      { name: 'task 8', stage: 2 },
      { name: 'task 9', stage: 3 },
      { name: 'task 10', stage: 3 },
    ];
    component.tasks = tasks;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    return {
      fixture,
      component,
      compiled
    };
  };

  it('For each task in stage 0 and stage 1, backward and forward buttons are correctly enabled/disabled', async() => {
    const {compiled, fixture} = factory();
    await fixture.whenStable();

    let backlogStage = getByTestId(testIds.stages[0], compiled);
    expect(backlogStage.children.length).toEqual(3);

    expect(backlogStage.contains(getByTestId('task-1-name', compiled))).toBe(true);
    expect(backlogStage.contains(getByTestId('task-2-name', compiled))).toBe(true);
    expect(backlogStage.contains(getByTestId('task-3-name', compiled))).toBe(true);

    expect(getByTestId('task-1-name', compiled).innerHTML).toBe('task 1');
    expect(getByTestId('task-1-back', compiled).disabled).toEqual(true);
    expect(getByTestId('task-1-forward', compiled).disabled).toBeFalsy();

    expect(getByTestId('task-2-name', compiled).innerHTML).toBe('task 2');
    expect(getByTestId('task-2-back', compiled).disabled).toEqual(true);
    expect(getByTestId('task-2-forward', compiled).disabled).toBeFalsy();

    expect(getByTestId('task-3-name', compiled).innerHTML).toBe('task 3');
    expect(getByTestId('task-3-back', compiled).disabled).toEqual(true);
    expect(getByTestId('task-3-forward', compiled).disabled).toBeFalsy();

    let toDoStage = getByTestId(testIds.stages[1], compiled);

    expect(toDoStage.children.length).toBe(3);
    expect(toDoStage.contains(getByTestId('task-4-name', compiled))).toBe(true);
    expect(toDoStage.contains(getByTestId('task-5-name', compiled))).toBe(true);
    expect(toDoStage.contains(getByTestId('task-6-name', compiled))).toBe(true);

    expect(getByTestId('task-4-name', compiled).innerHTML).toBe('task 4');
    expect(getByTestId('task-4-back', compiled).disabled).toBeFalsy();
    expect(getByTestId('task-4-forward', compiled).disabled).toBeFalsy();

    expect(getByTestId('task-5-name', compiled).innerHTML).toBe('task 5');
    expect(getByTestId('task-5-back', compiled).disabled).toBeFalsy();
    expect(getByTestId('task-5-forward', compiled).disabled).toBeFalsy();

    expect(getByTestId('task-6-name', compiled).innerHTML).toBe('task 6');
    expect(getByTestId('task-6-back', compiled).disabled).toBeFalsy();
    expect(getByTestId('task-6-forward', compiled).disabled).toBeFalsy();
  });

  it('For each task in stage 2 and stage 3, backward and forward buttons are correctly enabled/disabled', async() => {
    const {compiled, fixture} = factory();
    await fixture.whenStable();

    let onGoingStage = getByTestId(testIds.stages[2], compiled);

    expect(onGoingStage.children.length).toBe(2);
    expect(onGoingStage.contains(getByTestId('task-7-name', compiled))).toBe(true);
    expect(onGoingStage.contains(getByTestId('task-8-name', compiled))).toBe(true);

    expect(getByTestId('task-7-name', compiled).innerHTML).toBe('task 7');
    expect(getByTestId('task-8-back', compiled).disabled).toBeFalsy();
    expect(getByTestId('task-8-forward', compiled).disabled).toBeFalsy();

    expect(getByTestId('task-8-name', compiled).innerHTML).toBe('task 8');
    expect(getByTestId('task-8-back', compiled).disabled).toBeFalsy();
    expect(getByTestId('task-8-forward', compiled).disabled).toBeFalsy();

    let doneStage = getByTestId(testIds.stages[3], compiled);

    expect(doneStage.children.length).toBe(2);
    expect(doneStage.contains(getByTestId('task-9-name', compiled))).toBe(true);
    expect(doneStage.contains(getByTestId('task-10-name', compiled))).toBe(true);

    expect(getByTestId('task-9-name', compiled).innerHTML).toBe('task 9');
    expect(getByTestId('task-9-back', compiled).disabled).toBeFalsy();
    expect(getByTestId('task-9-forward', compiled).disabled).toEqual(true);

    expect(getByTestId('task-10-name', compiled).innerHTML).toBe('task 10');
    expect(getByTestId('task-10-back', compiled).disabled).toBeFalsy();
    expect(getByTestId('task-10-forward', compiled).disabled).toEqual(true);
  });

  it('For a task in stage 0, can be moved forward till stage 4 and buttons are correctly enabled and disabled in stage 4', async() => {
    const {compiled, fixture} = factory();
    await fixture.whenStable();

    const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;

    let backlogStage = getByTestId(testIds.stages[0], compiled);
	  let toDoStage = getByTestId(testIds.stages[1], compiled);
	  let onGoingStage = getByTestId(testIds.stages[2], compiled);
    let doneStage = getByTestId(testIds.stages[3], compiled);

    expect(backlogStage.contains(getByTestId(taskId, compiled))).toBe(true);
    expect(toDoStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId, compiled))).toBe(false);

    getByTestId(taskForwardIconId, compiled).click();
    await fixture.detectChanges();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0], compiled);
	  toDoStage = getByTestId(testIds.stages[1], compiled);
	  onGoingStage = getByTestId(testIds.stages[2], compiled);
    doneStage = getByTestId(testIds.stages[3], compiled);

    expect(backlogStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId, compiled))).toBe(true);
    expect(onGoingStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId, compiled))).toBe(false);

    getByTestId(taskForwardIconId, compiled).click();
    await fixture.detectChanges();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0], compiled);
	  toDoStage = getByTestId(testIds.stages[1], compiled);
	  onGoingStage = getByTestId(testIds.stages[2], compiled);
    doneStage = getByTestId(testIds.stages[3], compiled);

    expect(backlogStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId, compiled))).toBe(true);
    expect(doneStage.contains(getByTestId(taskId, compiled))).toBe(false);

    getByTestId(taskForwardIconId, compiled).click();
    await fixture.detectChanges();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0], compiled);
	  toDoStage = getByTestId(testIds.stages[1], compiled);
	  onGoingStage = getByTestId(testIds.stages[2], compiled);
    doneStage = getByTestId(testIds.stages[3], compiled);

    expect(backlogStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId, compiled))).toBe(true);

    expect(getByTestId('task-1-back', compiled).disabled).toBeFalsy();
    expect(getByTestId('task-1-forward', compiled).disabled).toEqual(true);
  });

  it('For a task in stage 4, can be moved backward till stage 0 and check for buttons are enabled/disabled correctly', async() => {
    const {compiled, fixture} = factory();
    await fixture.whenStable();

    const taskName = 'task 9';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskBackIconId = `${taskName.split(' ').join('-')}-back`;

    let backlogStage = getByTestId(testIds.stages[0], compiled);
	  let toDoStage = getByTestId(testIds.stages[1], compiled);
	  let onGoingStage = getByTestId(testIds.stages[2], compiled);
    let doneStage = getByTestId(testIds.stages[3], compiled);

    expect(backlogStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId, compiled))).toBe(true);

    getByTestId(taskBackIconId, compiled).click();
    await fixture.detectChanges();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0], compiled);
	  toDoStage = getByTestId(testIds.stages[1], compiled);
	  onGoingStage = getByTestId(testIds.stages[2], compiled);
    doneStage = getByTestId(testIds.stages[3], compiled);

    expect(backlogStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId, compiled))).toBe(true);
    expect(doneStage.contains(getByTestId(taskId, compiled))).toBe(false);

    getByTestId(taskBackIconId, compiled).click();
    await fixture.detectChanges();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0], compiled);
	  toDoStage = getByTestId(testIds.stages[1], compiled);
	  onGoingStage = getByTestId(testIds.stages[2], compiled);
    doneStage = getByTestId(testIds.stages[3], compiled);

    expect(backlogStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId, compiled))).toBe(true);
    expect(onGoingStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId, compiled))).toBe(false);

    getByTestId(taskBackIconId, compiled).click();
    await fixture.detectChanges();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0], compiled);
	  toDoStage = getByTestId(testIds.stages[1], compiled);
	  onGoingStage = getByTestId(testIds.stages[2], compiled);
    doneStage = getByTestId(testIds.stages[3], compiled);

    expect(backlogStage.contains(getByTestId(taskId, compiled))).toBe(true);
    expect(toDoStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId, compiled))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId, compiled))).toBe(false);

    expect(getByTestId('task-9-back', compiled).disabled).toEqual(true);
    expect(getByTestId('task-1-forward', compiled).disabled).toBeFalsy();
  });

  it('after many forward and back operations, tasks are in correct state', async() => {
    const {compiled, fixture} = factory();
    await fixture.whenStable();

    getByTestId(`task-1-forward`, compiled).click();
    getByTestId(`task-2-forward`, compiled).click();
    getByTestId(`task-4-forward`, compiled).click();
    getByTestId(`task-5-forward`, compiled).click();
    getByTestId(`task-6-back`, compiled).click();
    getByTestId(`task-7-forward`, compiled).click();
    getByTestId(`task-8-back`, compiled).click();
    getByTestId(`task-9-back`, compiled).click();
    getByTestId(`task-10-back`, compiled).click();

    await fixture.detectChanges();
    await fixture.whenStable();

    let backlogStage = getByTestId(testIds.stages[0], compiled);
	  let toDoStage = getByTestId(testIds.stages[1], compiled);
	  let onGoingStage = getByTestId(testIds.stages[2], compiled);
    let doneStage = getByTestId(testIds.stages[3], compiled);

    expect(backlogStage.children.length).toBe(2);
    expect(backlogStage.contains(getByTestId('task-3-name', compiled))).toBe(true);
    expect(backlogStage.contains(getByTestId('task-6-name', compiled))).toBe(true);

    expect(toDoStage.children.length).toBe(3);
    expect(toDoStage.contains(getByTestId('task-1-name', compiled))).toBe(true);
    expect(toDoStage.contains(getByTestId('task-2-name', compiled))).toBe(true);
    expect(toDoStage.contains(getByTestId('task-8-name', compiled))).toBe(true);

    expect(onGoingStage.children.length).toBe(4);
    expect(onGoingStage.contains(getByTestId('task-4-name', compiled))).toBe(true);
    expect(onGoingStage.contains(getByTestId('task-5-name', compiled))).toBe(true);
    expect(onGoingStage.contains(getByTestId('task-9-name', compiled))).toBe(true);
    expect(onGoingStage.contains(getByTestId('task-10-name', compiled))).toBe(true);

    expect(doneStage.children.length).toBe(1);
    expect(doneStage.contains(getByTestId('task-7-name', compiled))).toBe(true);
  });
});
